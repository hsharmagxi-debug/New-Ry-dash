import { supabase, supabaseReady } from './supabaseClient.js';

// Realtime multiplayer over Supabase Broadcast channels — no custom game server needed.
// Each room is one Realtime channel; clients broadcast car transform ~15Hz and
// listen for presence (join/leave) + other players' transforms.
export class MultiplayerRoom {
  constructor(roomCode, localPlayer) {
    this.roomCode = roomCode;
    this.local = localPlayer; // { id, name, carModel, livery }
    this.channel = null;
    this.remotePlayers = new Map(); // id -> { name, carModel, livery, transform, lastUpdate }
    this.onPlayerJoin = null;
    this.onPlayerLeave = null;
    this.onTransform = null;
    this.onRaceStart = null;
    this.onFinish = null;
    this._lastSend = 0;
  }

  static generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  async connect() {
    if (!supabaseReady) {
      throw new Error('Supabase is not configured — multiplayer needs a free Supabase project. See .env.example.');
    }
    this.channel = supabase.channel(`race:${this.roomCode}`, {
      config: { presence: { key: this.local.id }, broadcast: { self: false, ack: false } },
    });

    this.channel
      .on('presence', { event: 'sync' }, () => {
        const state = this.channel.presenceState();
        const seen = new Set();
        Object.entries(state).forEach(([id, metas]) => {
          if (id === this.local.id) return;
          seen.add(id);
          const meta = metas[0];
          if (!this.remotePlayers.has(id)) {
            this.remotePlayers.set(id, { ...meta, transform: null, lastUpdate: 0 });
            this.onPlayerJoin?.(id, meta);
          }
        });
        for (const id of this.remotePlayers.keys()) {
          if (!seen.has(id)) {
            this.remotePlayers.delete(id);
            this.onPlayerLeave?.(id);
          }
        }
      })
      .on('broadcast', { event: 'transform' }, ({ payload }) => {
        if (payload.id === this.local.id) return;
        const p = this.remotePlayers.get(payload.id);
        if (p) {
          p.transform = payload;
          p.lastUpdate = performance.now();
        }
        this.onTransform?.(payload);
      })
      .on('broadcast', { event: 'race_start' }, ({ payload }) => this.onRaceStart?.(payload))
      .on('broadcast', { event: 'finish' }, ({ payload }) => this.onFinish?.(payload));

    await new Promise((resolve, reject) => {
      this.channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await this.channel.track({
            name: this.local.name,
            carModel: this.local.carModel,
            livery: this.local.livery,
          });
          resolve();
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          reject(new Error('Could not connect to room.'));
        }
      });
    });
  }

  sendTransform(t) {
    const now = performance.now();
    if (now - this._lastSend < 55) return; // ~18Hz throttle
    this._lastSend = now;
    this.channel?.send({
      type: 'broadcast',
      event: 'transform',
      payload: { id: this.local.id, ...t },
    });
  }

  sendRaceStart(payload) {
    this.channel?.send({ type: 'broadcast', event: 'race_start', payload });
  }

  sendFinish(payload) {
    this.channel?.send({ type: 'broadcast', event: 'finish', payload: { id: this.local.id, ...payload } });
  }

  get playerCount() {
    return this.remotePlayers.size + 1;
  }

  async leave() {
    if (this.channel) {
      await supabase.removeChannel(this.channel);
      this.channel = null;
    }
  }
}

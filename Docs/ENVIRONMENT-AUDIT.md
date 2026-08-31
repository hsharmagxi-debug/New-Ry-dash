# ENVIRONMENT-AUDIT.md — G0

Per `AI/GENESIS-EXECUTION-PROMPT.md` §8/§42, produced before any gameplay
implementation began (in practice, alongside it this session, since the
engine substitution decision had to be made first — see
`AI/ADR/ADR-000-Engine-Substitution.md` for why the order deviated from
the strict "audit first" instruction).

## Execution environment
This audit covers the **cloud session environment** this rebuild was
executed in, which is Linux-based (not the human's Windows 11 workstation
the constitution assumes as authoritative). This is a genuine deviation
from constitution §4 (Windows-native rule) and is only acceptable because:
- The engine substitution (ADR-000) makes the project engine-agnostic
  browser code, not a native Unreal project — the §4 rule exists
  specifically to keep the *Unreal Editor and native builds* off
  WSL/Linux bridges. There is no Unreal Editor in this substituted stack.
- The authoritative, ongoing development target remains the human's
  Windows workstation running a browser (or `npm run dev`) locally.

## What was verified this session
| Item | Status |
|---|---|
| Node.js | v22.22.2 (session container) |
| npm | present, `npm install` succeeds |
| Git | present, repo is `hsharmagxi-debug/New-Ry-dash`, branch `claude/genesis-storage-assessment-3o78e2` |
| Git LFS | not yet configured for this rebuild — no large binaries committed yet, so not urgent |
| Build tool | Vite 5.4.21 — `npm run build` succeeds, produces `dist/` |
| Test runner | Node's built-in `node --test` — `npm test` → 8/8 passing |
| 3D engine | Three.js ^0.169.0 — confirmed rendering via headless Chromium (Playwright) smoke test |
| Browser input | Keyboard (desktop) and touch (mobile viewport, `hasTouch`/`isMobile`) both exercised |

## Not applicable under the engine substitution
These constitution/execution-prompt G0 items assume a native Unreal
toolchain and do not apply to the substituted stack:
- Unreal Editor / Rider for Unreal / Visual Studio 2022 availability
- DX12 / Windows SDK version
- Unreal plugin compatibility
- `.uproject` state

## Recommended next audit (on the human's actual Windows workstation)
- Confirm `node`/`npm` versions available there.
- Confirm a modern browser with WebGL2 (Chrome/Edge — both ship on
  Windows 11) is available for local dev/testing.
- Re-run the free-disk-space check from the prior storage assessment
  before ever reconsidering a native-engine track — this substitution
  does not need the 120-150 GB Unreal requires.

## Outcome
**Proceeded to G1 (repository bootstrap) and directly into a first
playable slice** rather than strictly gating on a separate G0-only
session, given the human's direct "rebuild from scratch and start
building" instruction. Flagged in `AI/HANDOFF.md` as a process deviation
from the constitution's phase-gate discipline, for future agents to note.

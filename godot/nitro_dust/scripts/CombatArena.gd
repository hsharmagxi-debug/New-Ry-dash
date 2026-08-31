extends Spatial
# CombatArena.gd — arena-level wiring only (cross-node references, match
# start). No simulation or rules logic lives here — it delegates to
# MatchState (autoload) and the ship/HUD nodes' own scripts.
class_name CombatArena

onready var player = $PlayerShip
onready var enemy = $EnemyShip
onready var hud = $HUDLayer/CombatHUD

func _ready():
	enemy.target_path = enemy.get_path_to(player)
	hud.player_path = hud.get_path_to(player)
	hud.enemy_path = hud.get_path_to(enemy)
	hud._player = player
	hud._enemy = enemy
	if hud._player:
		hud._player.controller.connect("boost_energy_changed", hud, "_on_boost_changed")
		hud._player.health.connect("damaged", hud, "_on_player_damaged")

	MatchState.start_match(120.0)

func _process(delta):
	MatchState.step(delta)

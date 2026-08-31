extends Spatial
# CombatArena.gd — arena-level wiring only (cross-node references, match
# start). No simulation or rules logic lives here — it delegates to
# MatchState (autoload) and the ship/HUD nodes' own scripts.
class_name CombatArena

onready var player = $PlayerShip
onready var enemy = $EnemyShip
onready var hud = $HUDLayer/CombatHUD

func _ready():
	_build_starfield()

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

# PRESENTATION-only scene dressing (constitution §13 category) — a static
# star field so the arena reads as "space" instead of a flat black void.
# Built with a MultiMeshInstance (one draw call, same proven MeshInstance
# render path the ships/stations already use) rather than CPUParticles,
# which did not visibly render under this sandbox's software GLES2 driver.
func _build_starfield():
	var mm = MultiMesh.new()
	mm.transform_format = MultiMesh.TRANSFORM_3D
	mm.mesh = _star_mesh()

	var count = 500
	mm.instance_count = count
	var rng = RandomNumberGenerator.new()
	rng.seed = 1337
	for i in range(count):
		var pos = Vector3(
			rng.randf_range(-650, 650),
			rng.randf_range(-650, 650),
			rng.randf_range(-650, 650)
		)
		if pos.length() < 120.0:
			pos = pos.normalized() * 120.0
		var s = rng.randf_range(0.6, 2.4)
		var t = Transform(Basis().scaled(Vector3(s, s, s)), pos)
		mm.set_instance_transform(i, t)

	var mmi = MultiMeshInstance.new()
	mmi.name = "Starfield"
	mmi.multimesh = mm
	mmi.cast_shadow = GeometryInstance.SHADOW_CASTING_SETTING_OFF
	add_child(mmi)

func _star_mesh() -> Mesh:
	var mesh = SphereMesh.new()
	mesh.radius = 0.6
	mesh.height = 1.2
	mesh.radial_segments = 4
	mesh.rings = 2
	var mat = SpatialMaterial.new()
	mat.flags_unshaded = true
	mat.albedo_color = Color(0.85, 0.92, 1.0)
	mesh.material = mat
	return mesh

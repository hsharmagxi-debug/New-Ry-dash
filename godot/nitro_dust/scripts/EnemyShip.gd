extends Spatial
# EnemyShip.gd — basic AI opponent: face the target, close to attack range,
# strafe, fire. Deliberately simple (Genesis Combat Arena scope only —
# tactical/squad AI is future work, not this prototype's job).
class_name EnemyShip

export(int) var team := 1
export(NodePath) var target_path
export(float) var attack_range := 220.0
export(float) var preferred_range := 140.0

onready var controller: ShipController = $ShipController
onready var weapon: WeaponSystem = $ShipController/PrimaryWeapon
onready var health: HealthShield = $HealthShield

var _target: Spatial
var _respawn_transform: Transform
var _strafe_dir := 1.0
var _strafe_timer := 0.0

func _ready():
	_respawn_transform = global_transform
	health.connect("destroyed", self, "_on_destroyed")
	controller.team = team
	controller.health_shield = health
	if target_path:
		_target = get_node_or_null(target_path)

func _physics_process(delta):
	if not health.is_alive() or _target == null:
		return

	_strafe_timer -= delta
	if _strafe_timer <= 0.0:
		_strafe_timer = rand_range(1.2, 2.6)
		_strafe_dir *= -1.0

	var to_target: Vector3 = _target.global_transform.origin - global_transform.origin
	var distance := to_target.length()

	# Face the target (arcade "always tracking" turret-style facing, not a
	# realistic flight-path solver — good enough for a first playable AI).
	if distance > 0.01:
		var desired_basis := Transform().looking_at(-to_target.normalized(), Vector3.UP).basis
		global_transform.basis = global_transform.basis.slerp(desired_basis, clamp(delta * 2.2, 0.0, 1.0))

	controller.input_thrust = 1.0 if distance > preferred_range else (0.0 if distance > preferred_range * 0.7 else -0.4)
	controller.input_strafe = _strafe_dir
	controller.input_boost = distance > attack_range * 1.5

	controller.physics_step(delta)
	weapon.step(delta)
	health.step(delta)

	if distance <= attack_range:
		weapon.try_fire()

	global_transform = controller.global_transform

func get_health_shield() -> HealthShield:
	return health

func _on_destroyed():
	MatchState.register_kill(1 - team)
	call_deferred("_respawn")

func _respawn():
	health.reset()
	controller.velocity = Vector3.ZERO
	controller.global_transform = _respawn_transform
	global_transform = _respawn_transform

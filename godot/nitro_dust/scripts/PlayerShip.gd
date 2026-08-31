extends Spatial
# PlayerShip.gd — glue node: reads raw input, drives ShipController
# (simulation), forwards to WeaponSystem, exposes HealthShield/team for
# Projectile hit resolution. Presentation (mesh/VFX) is a child node under
# this same scene, not referenced here by name — keeps simulation/glue
# ignorant of what the ship looks like.
class_name PlayerShip

export(int) var team := 0

onready var controller: ShipController = $ShipController
onready var weapon: WeaponSystem = $ShipController/PrimaryWeapon
onready var health: HealthShield = $HealthShield

var _respawn_transform: Transform

func _ready():
	_respawn_transform = global_transform
	health.connect("destroyed", self, "_on_destroyed")
	controller.team = team
	controller.health_shield = health

func _physics_process(delta):
	if not health.is_alive():
		return

	controller.input_thrust = 0.0
	controller.input_strafe = 0.0
	controller.input_vertical = 0.0
	controller.input_pitch = 0.0
	controller.input_yaw = 0.0
	controller.input_roll = 0.0

	if Input.is_key_pressed(KEY_W):
		controller.input_thrust += 1.0
	if Input.is_key_pressed(KEY_S):
		controller.input_thrust -= 1.0
	if Input.is_key_pressed(KEY_A):
		controller.input_strafe -= 1.0
	if Input.is_key_pressed(KEY_D):
		controller.input_strafe += 1.0
	if Input.is_key_pressed(KEY_Q):
		controller.input_roll -= 1.0
	if Input.is_key_pressed(KEY_E):
		controller.input_roll += 1.0
	if Input.is_key_pressed(KEY_R):
		controller.input_vertical += 1.0
	if Input.is_key_pressed(KEY_F):
		controller.input_vertical -= 1.0
	if Input.is_key_pressed(KEY_UP):
		controller.input_pitch -= 1.0
	if Input.is_key_pressed(KEY_DOWN):
		controller.input_pitch += 1.0
	if Input.is_key_pressed(KEY_LEFT):
		controller.input_yaw -= 1.0
	if Input.is_key_pressed(KEY_RIGHT):
		controller.input_yaw += 1.0
	controller.input_boost = Input.is_key_pressed(KEY_SHIFT)

	controller.physics_step(delta)
	weapon.step(delta)
	health.step(delta)

	if Input.is_key_pressed(KEY_SPACE):
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

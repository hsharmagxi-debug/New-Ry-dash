extends KinematicBody
# ShipController.gd — SIMULATION layer (movement only; no rendering, no UI).
#
# Arcade-first 6DOF flight model per the direction doc §5: inertia, boost,
# strafe, pitch/yaw/roll, never a "camera moving through a scene." Physics
# fidelity is intentionally simplified (no full aerodynamics) in favor of
# responsiveness — this is Candidate A, same status discipline as the
# Genesis proving-ground physics: IMPLEMENTED, not yet independently reviewed
# or benchmarked against alternative flight-model candidates.
class_name ShipController

export(Resource) var stats  # ShipStats
export(int) var team := 0

# Projectile.gd collides with THIS node (the KinematicBody), not the ship's
# root Spatial — so combat resolution needs a HealthShield reference here
# too. The owning ship glue script (PlayerShip/EnemyShip) wires this in
# _ready(); ShipController itself never constructs or owns a HealthShield.
var health_shield  # HealthShield, assigned externally

var velocity := Vector3.ZERO
var boost_energy := 1.0
var is_boosting := false

# Input snapshot, set once per frame by whoever drives this ship (the local
# player's input reader, or an AI controller) — the controller itself has
# no opinion about where input comes from.
var input_thrust := 0.0      # -1..1
var input_strafe := 0.0      # -1..1 (local X)
var input_vertical := 0.0    # -1..1 (local Y)
var input_pitch := 0.0       # -1..1
var input_yaw := 0.0         # -1..1
var input_roll := 0.0        # -1..1
var input_boost := false

signal boost_energy_changed(fraction)

func _ready():
	if stats == null:
		push_warning("ShipController has no ShipStats assigned — using defaults")
		stats = load("res://scripts/data/ShipStats.gd").new()

func physics_step(delta: float) -> void:
	if stats == null:
		return

	# Rotation: local torque-like integration (arcade, not physically exact).
	rotate_object_local(Vector3.RIGHT, input_pitch * stats.pitch_rate * delta)
	rotate_object_local(Vector3.UP, -input_yaw * stats.yaw_rate * delta)
	rotate_object_local(Vector3.FORWARD, -input_roll * stats.roll_rate * delta)

	var basis := global_transform.basis
	var forward := -basis.z
	var right := basis.x
	var up := basis.y

	var thrust_accel = stats.max_thrust_accel
	if input_boost and boost_energy > 0.0:
		is_boosting = true
		thrust_accel += stats.boost_accel_bonus
		boost_energy = max(0.0, boost_energy - stats.boost_drain_per_second * delta)
	else:
		is_boosting = false
		boost_energy = min(stats.boost_max_energy, boost_energy + stats.boost_regen_per_second * delta)
	emit_signal("boost_energy_changed", boost_energy / max(0.0001, stats.boost_max_energy))

	var accel := Vector3.ZERO
	accel += forward * input_thrust * thrust_accel
	accel += right * input_strafe * stats.strafe_accel
	accel += up * input_vertical * stats.strafe_accel

	velocity += accel * delta

	var speed := velocity.length()
	if speed > stats.max_speed:
		velocity = velocity.normalized() * stats.max_speed

	# Light velocity damping so the ship isn't a frictionless drift-forever
	# object at arcade timescales — still reads as "space," just controllable.
	velocity = velocity.linear_interpolate(Vector3.ZERO, delta * 0.15)

	move_and_slide(velocity)

func get_health_shield():
	return health_shield

func get_speed() -> float:
	return velocity.length()

func get_speed_fraction() -> float:
	if stats == null or stats.max_speed <= 0.0:
		return 0.0
	return clamp(get_speed() / stats.max_speed, 0.0, 1.0)

extends KinematicBody
# Projectile.gd — SIMULATION layer: straight-line travel, range cutoff,
# collision -> damage. Presentation (trail VFX, impact FX) reacts to
# `hit`/`expired` signals fired just before this node frees itself.
class_name Projectile

var _velocity := Vector3.ZERO
var _damage := 0.0
var _remaining_range := 0.0
var _team := 0

signal hit(target, at_position)
signal expired(at_position)

func launch(direction: Vector3, speed: float, damage: float, range_m: float, team: int) -> void:
	_velocity = direction.normalized() * speed
	_damage = damage
	_remaining_range = range_m
	_team = team

func _physics_process(delta: float) -> void:
	var motion := _velocity * delta
	var collision := move_and_collide(motion)
	_remaining_range -= motion.length()

	if collision:
		var target = collision.collider
		if target and target.has_method("get_health_shield") and target.get("team") != _team:
			var hs = target.get_health_shield()
			if hs:
				hs.apply_damage(_damage)
		emit_signal("hit", target, collision.position)
		queue_free()
		return

	if _remaining_range <= 0.0:
		emit_signal("expired", global_transform.origin)
		queue_free()

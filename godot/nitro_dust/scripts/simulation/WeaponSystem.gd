extends Node
# WeaponSystem.gd — SIMULATION layer: fire-rate gating and projectile
# spawning. Presentation (muzzle VFX, sound) subscribes to `fired`.
class_name WeaponSystem

export(Resource) var stats  # WeaponStats
export(NodePath) var muzzle_path
export(PackedScene) var projectile_scene

export(int) var owner_team := 0  # 0 = player, 1 = hostile — simple team filter for the prototype

var _cooldown := 0.0

signal fired(origin, direction)

func step(delta: float) -> void:
	if _cooldown > 0.0:
		_cooldown -= delta

func try_fire() -> bool:
	if stats == null or _cooldown > 0.0:
		return false
	_cooldown = 1.0 / max(0.01, stats.fire_rate)

	var muzzle: Spatial = get_node_or_null(muzzle_path) if muzzle_path else null
	var origin: Vector3 = muzzle.global_transform.origin if muzzle else get_parent().global_transform.origin
	var direction: Vector3 = -(muzzle.global_transform.basis.z if muzzle else get_parent().global_transform.basis.z)

	if projectile_scene:
		var proj = projectile_scene.instance()
		get_tree().current_scene.add_child(proj)
		proj.global_transform.origin = origin
		proj.look_at(origin + direction, Vector3.UP)
		if proj.has_method("launch"):
			proj.launch(direction, stats.projectile_speed, stats.damage, stats.range_m, owner_team)

	emit_signal("fired", origin, direction)
	return true

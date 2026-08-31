extends Node
# HealthShield.gd — SIMULATION layer: hull + shield state and damage rules.
# No VFX, no HUD updates here — those subscribe to this node's signals.
class_name HealthShield

export(Resource) var stats  # ShipStats (reuses hull/shield fields)

var hull := 100.0
var shield := 60.0
var _time_since_hit := 999.0

signal damaged(amount, hull_remaining, shield_remaining)
signal destroyed()
signal shield_broken()

func _ready():
	if stats:
		hull = stats.max_hull
		shield = stats.max_shield

func step(delta: float) -> void:
	_time_since_hit += delta
	if stats == null:
		return
	if shield < stats.max_shield and _time_since_hit >= stats.shield_regen_delay:
		shield = min(stats.max_shield, shield + stats.shield_regen_per_second * delta)

func apply_damage(amount: float) -> void:
	if amount <= 0.0 or hull <= 0.0:
		return
	_time_since_hit = 0.0
	var remaining := amount
	if shield > 0.0:
		var absorbed := min(shield, remaining)
		shield -= absorbed
		remaining -= absorbed
		if shield <= 0.0:
			emit_signal("shield_broken")
	if remaining > 0.0:
		hull = max(0.0, hull - remaining)
	emit_signal("damaged", amount, hull, shield)
	if hull <= 0.0:
		emit_signal("destroyed")

func reset() -> void:
	if stats:
		hull = stats.max_hull
		shield = stats.max_shield
	_time_since_hit = 999.0

func is_alive() -> bool:
	return hull > 0.0

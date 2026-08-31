extends Resource
# WeaponStats.gd — portable weapon schema (simulation-layer data, no
# rendering/VFX fields here — those belong to a presentation-layer resource
# per the direction doc's simulation/presentation separation, §13).
class_name WeaponStats

export(String) var weapon_id = "pulse_cannon"
export(String) var display_name = "Pulse Cannon"
export(float) var damage = 8.0
export(float) var fire_rate = 6.0          # shots per second
export(float) var projectile_speed = 340.0
export(float) var range_m = 500.0
export(float) var energy_cost = 0.0        # 0 = unlimited (primary), >0 draws from ship energy

extends Resource
# ShipStats.gd
#
# Portable spacecraft capability schema (per NITRO_DUST direction doc §4/§14).
# This is a DATA contract, not engine-specific — the same field set could be
# re-expressed as JSON for a future non-Godot pipeline without losing meaning.
# Original Nitro Dust terminology; role names below are functional labels
# only, not final in-universe names (documented as a TODO in ORIGINAL_IP_BIBLE.md).
class_name ShipStats

export(String) var role_id = "interceptor"      # interceptor/racer/assault/explorer/etc.
export(String) var display_name = "Prototype Ship"

# Movement
export(float) var max_thrust_accel = 40.0        # m/s^2
export(float) var max_speed = 220.0              # m/s
export(float) var strafe_accel = 26.0
export(float) var pitch_rate = 2.4               # rad/s
export(float) var yaw_rate = 2.0
export(float) var roll_rate = 3.2
export(float) var boost_accel_bonus = 22.0
export(float) var boost_max_energy = 1.0
export(float) var boost_drain_per_second = 0.45
export(float) var boost_regen_per_second = 0.14

# Combat
export(float) var max_hull = 100.0
export(float) var max_shield = 60.0
export(float) var shield_regen_per_second = 4.0
export(float) var shield_regen_delay = 2.5       # seconds since last hit

# Sensors / utility (reserved for exploration/mission pillars — unused by
# the combat-arena prototype, present so the schema does not need to change
# shape when those pillars are implemented)
export(float) var sensor_range = 800.0
export(float) var cargo_capacity = 0.0

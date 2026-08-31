extends Control
# CombatHUD.gd — UI layer, combat-mode readout per the direction doc's
# adaptive-HUD requirement (§9: targeting, weapons, shields, hull, threats,
# score/timer for this arena mode). Reads state via signals only — no
# simulation logic lives here.
#
# Visual language ported from the human-provided "Nitro Dust UI Kit"
# reference (aerospace-instrumentation + motorsport-telemetry HUD: near-
# black panels, amber accent, bracket corners, Michroma/Rajdhani/Share Tech
# Mono type). One string from that reference — "STARFLEET COMBAT ACADEMY"
# — was deliberately NOT ported: it's literal Star Trek trademark language,
# which the project's own direction doc explicitly prohibits. Everything
# else in the kit (palette, type, panel language) is original design and
# was ported as-is.
class_name CombatHUD

export(NodePath) var player_path
export(NodePath) var enemy_path

onready var hull_label: Label = $StatusPanel/Margin/HullLabel
onready var hull_bar: ProgressBar = $StatusPanel/Margin/HullBar
onready var shield_label: Label = $StatusPanel/Margin/ShieldLabel
onready var shield_bar: ProgressBar = $StatusPanel/Margin/ShieldBar
onready var boost_label: Label = $StatusPanel/Margin/BoostLabel
onready var boost_bar: ProgressBar = $StatusPanel/Margin/BoostBar
onready var speed_label: Label = $StatusPanel/Margin/SpeedLabel
onready var score_label: Label = $ScorePanel/Margin/ScoreLabel
onready var timer_label: Label = $ScorePanel/Margin/TimerLabel
onready var status_label: Label = $StatusLabel

const COLOR_AMBER = Color(0.788, 0.561, 0.235)
const COLOR_DANGER = Color(0.71, 0.271, 0.227)
const COLOR_TEXT = Color(0.91, 0.902, 0.882)

var _player: Spatial
var _enemy: Spatial

func _ready():
	_player = get_node_or_null(player_path)
	_enemy = get_node_or_null(enemy_path)

	if MatchState:
		MatchState.connect("score_changed", self, "_on_score_changed")
		MatchState.connect("time_changed", self, "_on_time_changed")
		MatchState.connect("match_ended", self, "_on_match_ended")

	if _player:
		_player.controller.connect("boost_energy_changed", self, "_on_boost_changed")
		_player.health.connect("damaged", self, "_on_player_damaged")

func _process(_delta):
	if _player and _player.health:
		var h = _player.health
		var max_hull = h.stats.max_hull if h.stats else 100.0
		var max_shield = h.stats.max_shield if h.stats else 60.0
		hull_label.text = "HULL   %03d / %03d" % [int(h.hull), int(max_hull)]
		shield_label.text = "SHLD   %03d / %03d" % [int(h.shield), int(max_shield)]
		hull_bar.value = 100.0 * h.hull / max(0.001, max_hull)
		shield_bar.value = 100.0 * h.shield / max(0.001, max_shield)
		# Hull-critical readability cue (matches the kit's "HULL INTEGRITY
		# LOW" red alert state) — swap the hull label's color, not a new
		# widget, so it stays cheap to read at a glance.
		hull_label.add_color_override("font_color", COLOR_DANGER if h.hull / max(0.001, max_hull) < 0.3 else COLOR_TEXT)
	if _player and _player.controller:
		speed_label.text = "%d M/S" % int(_player.controller.get_speed())

func _on_boost_changed(fraction):
	boost_label.text = "BOOST  %03d%%" % int(fraction * 100)
	boost_bar.value = fraction * 100.0

func _on_player_damaged(_amount, _hull, _shield):
	status_label.text = "TAKING FIRE"
	status_label.add_color_override("font_color", COLOR_DANGER)
	yield(get_tree().create_timer(0.4), "timeout")
	status_label.text = ""

func _on_score_changed(player_score, hostile_score):
	score_label.text = "YOU %d — %d HOSTILE" % [player_score, hostile_score]

func _on_time_changed(seconds_remaining):
	var m := int(seconds_remaining) / 60
	var s := int(seconds_remaining) % 60
	timer_label.text = "%02d:%02d" % [m, s]

func _on_match_ended(winner_team):
	if winner_team == 0:
		status_label.text = "MATCH COMPLETE — VICTORY"
		status_label.add_color_override("font_color", Color(0.4, 1.0, 0.75))
	elif winner_team == 1:
		status_label.text = "MATCH COMPLETE — DEFEAT"
		status_label.add_color_override("font_color", COLOR_DANGER)
	else:
		status_label.text = "MATCH COMPLETE — TIME OUT"
		status_label.add_color_override("font_color", COLOR_TEXT)

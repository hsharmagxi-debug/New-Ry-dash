extends Control
# CombatHUD.gd — UI layer, combat-mode readout per the direction doc's
# adaptive-HUD requirement (§9: targeting, weapons, shields, hull, threats,
# score/timer for this arena mode). Reads state via signals only — no
# simulation logic lives here.
class_name CombatHUD

export(NodePath) var player_path
export(NodePath) var enemy_path

onready var hull_label: Label = $Margin/VBox/HullLabel
onready var shield_label: Label = $Margin/VBox/ShieldLabel
onready var boost_label: Label = $Margin/VBox/BoostLabel
onready var speed_label: Label = $Margin/VBox/SpeedLabel
onready var score_label: Label = $Margin/VBox/ScoreLabel
onready var timer_label: Label = $Margin/VBox/TimerLabel
onready var status_label: Label = $Margin/VBox/StatusLabel

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
		hull_label.text = "HULL   %d / %d" % [int(_player.health.hull), int(_player.health.stats.max_hull if _player.health.stats else 100)]
		shield_label.text = "SHIELD %d / %d" % [int(_player.health.shield), int(_player.health.stats.max_shield if _player.health.stats else 60)]
	if _player and _player.controller:
		speed_label.text = "SPEED  %d m/s" % int(_player.controller.get_speed())

func _on_boost_changed(fraction):
	boost_label.text = "BOOST  %d%%" % int(fraction * 100)

func _on_player_damaged(_amount, _hull, _shield):
	status_label.text = "TAKING FIRE"
	status_label.modulate = Color(1, 0.35, 0.35)
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
		status_label.modulate = Color(0.4, 1.0, 0.75)
	elif winner_team == 1:
		status_label.text = "MATCH COMPLETE — DEFEAT"
		status_label.modulate = Color(1.0, 0.4, 0.4)
	else:
		status_label.text = "MATCH COMPLETE — TIME OUT"
		status_label.modulate = Color(0.8, 0.85, 0.9)

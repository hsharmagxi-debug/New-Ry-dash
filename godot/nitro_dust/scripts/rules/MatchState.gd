extends Node
# MatchState.gd — GAME RULES layer (autoload/singleton). Score, timer,
# match lifecycle. Deliberately knows nothing about rendering or a specific
# ship's flight model — it only reacts to signals (destroyed/scored).
class_name MatchStateSingleton

signal score_changed(player_score, hostile_score)
signal match_ended(winner_team)
signal time_changed(seconds_remaining)

export var match_duration := 120.0

var player_score := 0
var hostile_score := 0
var time_remaining := 120.0
var is_running := false

func start_match(duration: float = 120.0) -> void:
	match_duration = duration
	time_remaining = duration
	player_score = 0
	hostile_score = 0
	is_running = true
	emit_signal("score_changed", player_score, hostile_score)
	emit_signal("time_changed", time_remaining)

func step(delta: float) -> void:
	if not is_running:
		return
	time_remaining = max(0.0, time_remaining - delta)
	emit_signal("time_changed", time_remaining)
	if time_remaining <= 0.0:
		end_match(-1)  # time-out, no winner

func register_kill(killer_team: int) -> void:
	if not is_running:
		return
	if killer_team == 0:
		player_score += 1
	else:
		hostile_score += 1
	emit_signal("score_changed", player_score, hostile_score)

func end_match(winner_team: int) -> void:
	is_running = false
	emit_signal("match_ended", winner_team)

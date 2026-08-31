extends Control
# CornerFrame.gd — draws the aerospace-HUD "bracket corner" panel accent
# from the Nitro Dust UI Kit (four short L-shaped corner marks instead of a
# full rectangle border). Pure presentation, no gameplay logic.
class_name CornerFrame

export(Color) var line_color = Color(0.788, 0.561, 0.235) # amber, kit accent
export(float) var line_width = 1.5
export(float) var corner_len = 14.0

func _draw():
	var w = rect_size.x
	var h = rect_size.y
	var c = corner_len
	# top-left
	draw_line(Vector2(0, c), Vector2(0, 0), line_color, line_width)
	draw_line(Vector2(0, 0), Vector2(c, 0), line_color, line_width)
	# top-right
	draw_line(Vector2(w - c, 0), Vector2(w, 0), line_color, line_width)
	draw_line(Vector2(w, 0), Vector2(w, c), line_color, line_width)
	# bottom-right
	draw_line(Vector2(w, h - c), Vector2(w, h), line_color, line_width)
	draw_line(Vector2(w, h), Vector2(w - c, h), line_color, line_width)
	# bottom-left
	draw_line(Vector2(c, h), Vector2(0, h), line_color, line_width)
	draw_line(Vector2(0, h), Vector2(0, h - c), line_color, line_width)

func _ready():
	connect("resized", self, "update")

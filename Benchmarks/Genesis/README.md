# Benchmarks/Genesis/

Reserved location for six-speed-band benchmark data (constitution §19 /
execution prompt §19-20). No benchmark runs have been recorded yet —
Candidate A physics has only been smoke-tested manually this session, not
formally profiled at each of 80/150/250/400/600/900 km/h.

## Expected data dimensions (once populated)
build identifier, Git commit, candidate name, parameter preset, track
segment, target speed, hardware/browser, average FPS, 1% low, physics
time (ms), frame time (ms), steering error, stopping distance, stability
metrics, collision result, subjective playtest score (labeled
**SUBJECTIVE PLAYTEST RESULT** per constitution §22).

## Format
One JSON file per benchmark run, e.g. `2026-08-31-candidateA-sb400.json`.

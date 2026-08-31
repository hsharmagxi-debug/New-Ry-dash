# MASTER GAME CONSTITUTION v2
## PROJECT CODENAME: FUTURE RACING
### Source of Truth for a 2046–2051-Grade Futuristic Racing Universe

---

# 0. CONSTITUTIONAL STATUS

This document is the highest-level technical, creative, organizational, and quality authority for the project.

Every:

- AI agent;
- engineer;
- designer;
- reviewer;
- technical experiment;
- architecture proposal;
- implementation;
- benchmark;
- repository change;
- engine decision;
- prototype;
- production milestone

must inherit and obey this constitution.

Lower-level design documents may expand these rules but may not silently contradict them.

If a downstream requirement conflicts with this constitution, stop and surface the conflict explicitly.

Do not quietly reinterpret a non-negotiable rule.

---

# 1. MISSION

Build a real, playable, premium AAA futuristic racing universe whose foundational design assumes a **2046–2051 creative horizon**.

Do not build:

- “Asphalt with more graphics”;
- “Need for Speed in a futuristic city”;
- “Forza with neon”;
- “Wipeout with cars”;
- a compilation of existing racing mechanics;
- a browser racing demo;
- a mobile-first racer;
- a technology showcase without deep gameplay.

The target experience is governed by:

**SPEED + PHYSICS + INTELLIGENCE + WORLD + SPECTACLE + PLAYER AGENCY + PERSISTENCE + EMOTION**

Every flagship system must answer:

> Would this still feel innovative if it launched 20–25 years from today?

If no:

- reinvent it;
- reduce its strategic importance;
- or classify it as supporting functionality rather than innovation.

---

# 2. THE FIRST FIVE-MINUTE TEST

The vertical slice succeeds only if a player can experience roughly five minutes and intuitively understand that this is attempting something beyond the current racing-game generation.

The desired reaction is not merely:

- “beautiful graphics”;
- “great Unreal Engine demo”;
- “looks like Asphalt”;
- “looks like Forza”;
- “cool cyberpunk city.”

The stronger reactions are:

- “I have never felt speed like that.”
- “The car changed because I changed strategy.”
- “That track behaved like an active machine.”
- “The rival seemed to understand how I race.”
- “The environment changed what I could do.”
- “The car felt immediately exciting but had real depth.”
- “I didn't know a racing game could work this way.”

---

# 3. PLATFORM STRATEGY

## 3.1 Authoritative development platform

The authoritative game-development environment is:

**Windows 11 native**

Recommended workspace example:

`D:\GameDev\FutureRacing\`

The actual workspace root must remain configurable.

Never hardcode personal paths, usernames, drive letters, or machine-specific assumptions into project architecture.

---

# 4. WINDOWS-NATIVE RULE

Do not develop the authoritative Unreal project inside:

- WSL;
- `/mnt/c/...`;
- Linux-hosted NTFS bridges;
- browser IDEs;
- Replit;
- Lovable;
- Bolt;
- WebGL-first environments.

WSL may remain available for:

- backend services;
- Linux server experiments;
- scripting;
- Python;
- data processing;
- CI utilities;
- automation;
- auxiliary developer tooling.

The Unreal Editor, game source, Windows builds, primary profiling, local game workspace, and GPU tooling remain Windows-native.

---

# 5. PC-FIRST PRINCIPLE

The first target is an uncompromised high-end PC experience.

Do not reduce the foundational:

- physics;
- simulation;
- environment complexity;
- world interaction;
- vehicle systems;
- AI;
- destruction;
- rendering architecture;
- race logic;
- camera;
- audio

to accommodate contemporary mobile hardware.

Architecture should support future derivation toward:

- PlayStation;
- Xbox;
- cloud gaming;
- next-generation handhelds;
- high-end mobile derivatives;
- VR;
- XR;
- mixed reality;
- future platforms.

But:

> Future scalability must not establish today's design ceiling.

Build the highest-quality viable PC experience first.

Then profile.

Then identify scalable layers.

Then derive lower-cost implementations.

---

# 6. CURRENT TECHNICAL BASELINE

Current PROJECT GENESIS baseline:

**Unreal Engine 5.8.2**

Primary language:

**C++**

Rapid iteration:

**Blueprints**

Primary IDE:

**JetBrains Rider for Unreal**

Fallback / required Windows tooling:

**Visual Studio 2022**

Source control:

**GitHub + Git LFS**

Profiling:

**Unreal Insights**

CI:

**GitHub Actions + Windows build runner**

Current rendering candidates:

- Nanite;
- Lumen;
- hardware ray tracing where justified.

Physics baseline:

**Chaos underneath a custom racing physics abstraction**

VFX:

**Niagara**

Audio:

**MetaSounds**

World-building candidates:

- World Partition;
- PCG;
- Mesh Terrain or current equivalent technologies where justified.

No technology is adopted merely because it appears in this list.

---

# 7. ENGINE BASELINE IS UPDATABLE, NOT AUTOMATIC

UE 5.8.2 is the current Genesis baseline.

Agents may recommend a newer:

- patch;
- minor version;
- compatible release

only after explicitly evaluating:

1. compatibility;
2. regression risk;
3. plugin support;
4. build stability;
5. performance implications;
6. toolchain compatibility;
7. repository impact;
8. migration effort;
9. rollback feasibility.

No agent may upgrade the engine automatically.

An engine upgrade is a **human-approval action**.

Before recommending an upgrade, provide:

## Upgrade Proposal

- current version;
- proposed version;
- specific benefits;
- known breaking changes;
- plugin compatibility;
- build compatibility;
- performance deltas;
- migration procedure;
- rollback procedure;
- expected downtime/engineering cost;
- unresolved risks.

---

# 8. UE6-READY ARCHITECTURE

The current implementation uses UE5.8.2.

The game architecture must not become identical to UE5.8.2.

Think:

> Future Racing is the product. Unreal is the current implementation platform.

Design systems so major engine-dependent implementations can be replaced.

Use clean boundaries between:

### A. Portable game-domain logic

Examples:

- vehicle configuration;
- race rules;
- rival personality;
- damage calculations;
- energy systems;
- progression logic;
- telemetry schemas;
- race strategy;
- vehicle state.

### B. Unreal integration

Examples:

- Actors;
- Components;
- Subsystems;
- UObject integration;
- input binding;
- replication adapters;
- asset lifecycle.

### C. Engine/version-specific implementations

Examples:

- Chaos-specific physics;
- rendering integrations;
- Niagara implementations;
- World Partition implementation;
- engine-specific networking;
- Mass;
- PCG;
- current terrain systems.

A change in category C should not require rewriting category A unless genuinely necessary.

---

# 9. VEHICLE ARCHITECTURE — NON-NEGOTIABLE

Gameplay code must **never depend directly on Chaos Vehicles**.

Required conceptual architecture:

```text
Gameplay Systems
      ↓
Vehicle Simulation Interface
      ↓
Future Racing Physics Layer
      ↓
Physics Adapter
      ├── Chaos Implementation
      └── Future UE6 / Alternative Implementation
```

Chaos is an implementation.

Chaos is not the game's physics architecture.

Direct Chaos coupling outside designated adapters requires explicit architectural justification and review.

---

# 10. APPLY THE SAME ABSTRACTION PHILOSOPHY TO

- AI;
- networking;
- input;
- camera;
- world simulation;
- rendering integrations;
- telemetry;
- vehicle abilities;
- destruction;
- backend;
- persistence;
- replay;
- audio.

Do not create abstraction for abstraction's sake.

Abstract where long-term substitution, testing, portability, or architecture cleanliness creates measurable value.

---

# 11. C++ RESPONSIBILITIES

Prefer C++ for:

- vehicle simulation;
- racing physics;
- AI;
- race simulation;
- networking;
- damage;
- telemetry;
- reusable core architecture;
- world simulation;
- performance-sensitive gameplay;
- deterministic or semi-deterministic logic where appropriate;
- testing infrastructure;
- subsystem interfaces.

---

# 12. BLUEPRINT RESPONSIBILITIES

Prefer Blueprints for:

- gameplay tuning;
- level scripting;
- event orchestration;
- VFX triggers;
- rapid prototypes;
- designer configuration;
- debug tools;
- UI prototypes;
- iteration-heavy presentation logic.

Do not build giant unmaintainable Blueprint dependency webs.

Do not put systems in C++ solely to appear technically sophisticated.

Use the appropriate layer.

---

# 13. SOURCE CONTROL — GENESIS

Genesis must use:

**GitHub + Git LFS**

Git LFS should manage appropriate large binary assets.

Do not commit:

- generated build output;
- local IDE state;
- unnecessary caches;
- machine-specific files;
- secrets.

Maintain a robust Unreal-specific `.gitignore`.

---

# 14. PERFORCE MIGRATION TRIGGER

Do not migrate to Perforce because “AAA studios use Perforce.”

Evaluate migration when one or more of these become materially problematic:

- binary asset scale;
- Git repository performance;
- checkout/clone cost;
- large-file transfer cost;
- team concurrency;
- binary locking requirements;
- Content-folder growth;
- branch workflow friction;
- CI synchronization cost;
- large-team asset workflows.

Before migration, produce a source-control migration ADR.

---

# 15. RECOMMENDED REPOSITORY STRUCTURE

```text
FutureRacing/
│
├── Config/
├── Content/
│
├── Source/
│   ├── RacingCore/
│   ├── VehiclePhysics/
│   ├── VehicleSystems/
│   ├── RaceAI/
│   ├── WorldSimulation/
│   ├── RaceDirector/
│   ├── CameraSystem/
│   ├── DamageSystem/
│   ├── Multiplayer/
│   └── Telemetry/
│
├── Plugins/
│   ├── FRVehicleCore/
│   ├── FRFutureWorld/
│   ├── FRAIDriver/
│   └── FRPerformance/
│
├── Tests/
├── Tools/
├── Docs/
├── Research/
├── Benchmarks/
│
└── AI/
    ├── MASTER-CONSTITUTION.md
    ├── AGENTS.md
    ├── GAME-DESIGN-BIBLE.md
    ├── TECHNICAL-ARCHITECTURE.md
    ├── BENCHMARKS.md
    ├── QUALITY-GATES.md
    ├── ADR/
    └── HANDOFF.md
```

Do not mechanically create every module before it is needed.

The structure indicates ownership boundaries.

Implement modules incrementally.

---

# 16. MULTI-AGENT AUTHORITY MODEL

Default AI structure:

```text
                     GAME DIRECTOR
                   Lead Orchestrator
                          │
           ┌──────────────┼───────────────┐
           │              │               │
       Research        Systems       Architecture
        Agent           Agent            Agent
           │              │               │
           └──────────────┼───────────────┘
                          ▼
                IMPLEMENTATION LAYER
                          │
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  ▼
 Vehicle / Physics     World / VFX       AI / Rivals
       │                  │                  │
       └──────────────────┼──────────────────┘
                          ▼
                     BUILD GATE
                          │
                    Independent QA
                          │
                  Performance Review
                          │
                   Security Review
                          │
                  Critic / Benchmark
                          │
                     ACCEPT/REJECT
```

---

# 17. CLAUDE CODE / CODEX ROLES

Default:

**Claude Code = lead implementation + orchestration agent**

**Codex = mandatory independent engineering reviewer for significant changes**

Either system may propose alternate implementations.

However:

> The author cannot be the final approver.

Example:

```text
Claude
→ Vehicle Physics candidate

Codex
→ architecture/code review

QA
→ validation

Performance Agent
→ benchmark

Game Feel Critic
→ evaluation

Orchestrator
→ accept/reject

Human
→ protected integration authorization where required
```

If Codex authors a subsystem, use Claude or another qualified independent agent for engineering review.

---

# 18. AGENT WORKTREE ISOLATION

Each implementation agent receives:

- its own Git branch;
- its own Git worktree;
- a defined task;
- owned files/directories;
- explicit acceptance criteria.

No two implementation agents may concurrently modify the same working tree.

Shared high-risk files require orchestrator ownership.

Examples:

- `.uproject`;
- Build.cs files;
- Target files;
- shared configuration;
- central interfaces;
- core schema definitions.

Conflicting changes must be serialized or explicitly coordinated.

---

# 19. HUMAN PRODUCTION AUTHORITY — ABSOLUTE RULE

Agents may autonomously:

- research;
- inspect documentation;
- design;
- prototype;
- edit local files;
- build;
- run tests;
- profile;
- benchmark;
- critique;
- create local branches;
- create local commits;
- generate reports.

Agents must obtain explicit human approval before:

- pushing to protected branches;
- merging into protected development baselines;
- engine upgrades;
- cloud spending;
- paid asset purchases;
- production infrastructure changes;
- deployment;
- releases;
- destructive migrations;
- irreversible data changes;
- large external resource commitments.

The orchestrator is not a substitute for human production authority.

---

# 20. NO SELF-APPROVAL

An agent cannot validate its own major implementation.

Required separation:

```text
Author
  ↓
Independent Reviewer
  ↓
QA
  ↓
Performance where relevant
  ↓
Critic / Benchmark
  ↓
Orchestrator
  ↓
Human approval where constitutionally required
```

---

# 21. CONTEXT-AWARE QUALITY GATES

Protected-baseline integration requires all relevant gates.

Canonical sequence:

```text
Compile
  ↓
Static Analysis / Lint
  ↓
Automated Tests
  ↓
Functional Validation
  ↓
Performance / Unreal Insights
  ↓
Independent Engineering Review
  ↓
Critic / Benchmark Review
  ↓
Orchestrator Acceptance
  ↓
Human Approval when required
```

Not all gates apply equally to all changes.

Examples:

A documentation correction should not require GPU profiling.

A vehicle-physics change must require relevant physics and performance testing.

A renderer change requires GPU analysis.

A telemetry schema change requires data validation.

Document gate applicability explicitly.

---

# 22. EVIDENCE-OVER-OPINION RULE

Agents must never declare:

- “better”;
- “faster”;
- “more realistic”;
- “more responsive”;
- “more stable”;
- “more fun”;
- “more cinematic”;
- “optimized”

without evidence appropriate to the claim.

Valid evidence includes:

- telemetry;
- benchmark data;
- Unreal Insights captures;
- automated tests;
- controlled playtests;
- A/B comparisons;
- defined acceptance criteria;
- reproducible measurements.

Subjective judgments are allowed, but they must be labeled subjective and paired with structured evaluation.

---

# 23. THREE-CANDIDATE RULE

For foundational systems, do not automatically commit to the first viable implementation.

Where practical, produce **three meaningfully different candidate approaches**.

Applies especially to:

- core vehicle physics;
- drift architecture;
- steering model;
- camera;
- sense of speed;
- boost;
- high-speed controls;
- racing AI;
- adaptive track logic.

Candidates should be meaningfully distinct, not cosmetic parameter changes.

Example:

### Camera Candidate A

physics-following cinematic spring system.

### Camera Candidate B

velocity-predictive trajectory camera.

### Camera Candidate C

hybrid intent-aware camera using vehicle state + track topology.

Benchmark all three against shared criteria.

Select using evidence.

If three implementations are prohibitively expensive, document why and test the highest-value alternatives feasible.

---

# 24. PROJECT GENESIS

The first engineering milestone is:

# **PROJECT GENESIS**
## “Can we reinvent the feeling of speed?”

Genesis comes before:

- final game name;
- production vehicles;
- city production;
- story;
- monetization;
- live services;
- huge worlds;
- multiplayer;
- career mode;
- production art.

---

# 25. GENESIS SCOPE — STRICT

Genesis contains:

**ONE vehicle**

+

**ONE graybox proving ground**

+

**vehicle physics**

+

**input**

+

**camera**

+

**sense of speed**

+

**telemetry/debug HUD**

+

**automated validation**

Nothing more unless it directly supports those objectives.

---

# 26. GENESIS EXPLICITLY EXCLUDES

- production city;
- polished world art;
- large car roster;
- career;
- progression;
- economy;
- monetization;
- multiplayer;
- production UI;
- cosmetics;
- licensed brands;
- story campaign;
- huge destruction systems;
- production weather;
- final audio production;
- expensive content creation.

Do not camouflage weak physics with presentation.

---

# 27. THE UGLY PROTOTYPE PRINCIPLE

Genesis should initially look intentionally plain.

Preferred visual environment:

- black;
- white;
- gray;
- high-contrast markers;
- clean track geometry;
- readable reference structures;
- distance indicators;
- braking markers;
- surface sections;
- jump tests;
- collision barriers;
- banking;
- gradients;
- straights;
- technical corners.

The proving ground is a laboratory.

If this:

```text
===============================
           TEST ROAD

                [CAR]
===============================
```

is not extremely compelling to drive, stop.

Do not build the future city yet.

---

# 28. SIX SPEED-BAND TESTS

Genesis must explicitly validate:

- 80 km/h;
- 150 km/h;
- 250 km/h;
- 400 km/h;
- 600 km/h;
- 900 km/h.

Also test transitions:

- 80 → 150;
- 150 → 250;
- 250 → 400;
- 400 → 600;
- 600 → 900;
- reverse deceleration transitions.

---

# 29. EACH SPEED BAND MUST EVALUATE

- steering sensitivity;
- steering authority;
- high-speed stability;
- braking;
- stopping distance;
- traction;
- weight transfer;
- suspension response;
- camera distance;
- camera lag;
- camera damping;
- FOV;
- motion cues;
- environmental readability;
- obstacle anticipation;
- reaction window;
- lane precision;
- collision survivability;
- recovery behavior;
- perceived speed;
- controller precision.

Different speed regimes may require different assistance and control philosophies.

Do not merely scale the same steering curve indefinitely.

---

# 30. TRANSITION QUALITY

The player must not feel arbitrary hidden mode switching.

Speed-band transitions should be:

- smooth;
- predictable;
- physically readable;
- mechanically understandable.

If high-speed assistance changes:

- expose telemetry;
- document the rules;
- prevent unpredictable control discontinuities.

---

# 31. GENESIS VEHICLE PHYSICS

Investigate:

- acceleration;
- braking;
- steering;
- traction;
- tire behavior abstraction;
- suspension;
- weight transfer;
- aerodynamic load;
- drag;
- downforce;
- surface friction;
- drift initiation;
- drift maintenance;
- drift recovery;
- boost;
- jumps;
- airborne control;
- landing;
- collisions;
- stability recovery.

The goal is not pure simulation.

The target is:

> believable physical behavior deliberately shaped into extraordinary entertainment.

---

# 32. CAMERA IS A FOUNDATIONAL SYSTEM

Genesis camera work is as important as physics.

Investigate:

- velocity-sensitive FOV;
- acceleration cues;
- braking cues;
- camera lag;
- camera damping;
- drift composition;
- boost reaction;
- terrain anticipation;
- collision response;
- vertical movement;
- camera shake;
- horizon stability;
- positional offset;
- motion blur policies;
- speed-line alternatives;
- peripheral motion;
- environmental flow.

The camera must increase speed perception without damaging precision.

---

# 33. SENSE OF SPEED IS MULTISYSTEM

Do not treat “sense of speed” as FOV alone.

It may emerge from:

- physics;
- acceleration curves;
- camera;
- road scale;
- environmental reference objects;
- peripheral motion;
- suspension movement;
- VFX;
- audio;
- controller feedback;
- near-miss distance;
- road texture frequency;
- light movement;
- aerodynamic feedback;
- speed-dependent anticipation.

Genesis should determine which combinations produce the strongest effect.

---

# 34. PERFORMANCE

Performance is a gameplay system.

Target profiles for the larger project include:

- 1080p / 60 FPS mainstream;
- 1440p / 60–120 FPS enthusiast;
- 4K / 60+ FPS high-end where reasonable;
- ultrawide;
- high refresh rate.

Genesis should prioritize:

- stable frame time;
- clean instrumentation;
- reproducible performance;
- scalable testing.

Do not delay performance instrumentation until production.

---

# 35. PROFILING

Use Unreal Insights and relevant low-level tools.

Capture:

- Game Thread;
- Render Thread;
- GPU;
- physics cost;
- input timing;
- simulation cost;
- memory;
- spikes;
- frame pacing.

Define subsystem budgets.

A physics experiment that feels marginally better while multiplying frame cost may not be the correct architecture.

---

# 36. MCP / LLM EDITOR INTEGRATION

Unreal MCP/LLM tooling begins as:

**EXPERIMENTAL**

It is not required to build the game.

Before adoption as an official workflow, validate:

- security;
- permission boundaries;
- determinism;
- Editor stability;
- source-control safety;
- auditability;
- observability;
- failure recovery;
- real productivity gains.

If it fails these tests, keep it optional or disable it.

The game must never depend on MCP infrastructure to compile, cook, package, test, or ship.

---

# 37. COMPETITIVE RESEARCH RULE

Study relevant games, but use them as evidence rather than specifications.

Benchmark:

- Asphalt Legends;
- Forza Horizon;
- Forza Motorsport;
- Gran Turismo;
- Need for Speed;
- Burnout;
- The Crew;
- Trackmania;
- F-Zero;
- Wipeout;
- BeamNG.drive;
- relevant open-world games;
- competitive multiplayer games;
- real motorsport;
- vehicle-dynamics research.

For each:

1. strongest feature;
2. why it works;
3. current limitations;
4. player friction;
5. dated assumptions;
6. what should be reinvented;
7. what must not be copied.

---

# 38. ORIGINALITY / IP

Never copy:

- source code;
- models;
- vehicle designs;
- tracks;
- artwork;
- UI;
- logos;
- sounds;
- music;
- fictional branding;
- lore;
- proprietary algorithms;
- protected assets.

Develop original:

- manufacturers;
- vehicles;
- mechanics;
- universe;
- environments;
- visual language;
- UX;
- technology fiction;
- progression;
- brand identity.

---

# 39. LONG-TERM GAMEPLAY INNOVATION TARGETS

Future phases may investigate:

### Morphing vehicles

Dynamic changes to:

- aero;
- ride height;
- suspension geometry;
- wings;
- drivetrain;
- wheels;
- tires;
- cooling;
- energy routing.

### Adaptive tracks

- rotating structures;
- route creation;
- route collapse;
- dynamic lanes;
- magnetic surfaces;
- environmental transformation.

### Multi-surface racing

Road

→ wall

→ vertical magnetic surface

→ tunnel

→ airborne segment

→ water-skimming infrastructure

→ subterranean city

→ high-altitude environment.

### Persistent rivals

AI opponents possess:

- personality;
- memory;
- strengths;
- weaknesses;
- risk tolerance;
- aggression;
- relationship history;
- strategic adaptation.

### Dynamic racing director

Manipulates environment and pacing without unfairly choosing winners.

### Reactive world

Traffic, crowds, infrastructure, security, advertisements, and media can respond to player history.

### Hyper-speed gameplay

Extreme speeds introduce deeper:

- trajectory prediction;
- aero management;
- energy strategy;
- anticipation;
- stability control.

---

# 40. DO NOT BUILD THOSE SYSTEMS DURING GENESIS

Genesis proves the foundational driving experience first.

Do not let long-term ambition produce scope explosion.

---

# 41. DOCUMENTATION

Maintain:

`AI/MASTER-CONSTITUTION.md`

`AI/AGENTS.md`

`AI/GAME-DESIGN-BIBLE.md`

`AI/TECHNICAL-ARCHITECTURE.md`

`AI/BENCHMARKS.md`

`AI/QUALITY-GATES.md`

`AI/HANDOFF.md`

and:

`AI/ADR/`

for Architecture Decision Records.

---

# 42. CHANGE REPORT FORMAT

Every significant code change must document:

## Purpose

## Files Changed

## Architecture Impact

## Dependencies

## Test Procedure

## Test Results

## Performance Impact

## Compatibility Risk

## UE6 Migration Consideration

## Known Issues

## Rollback

---

# 43. IMPLEMENTATION STATUS LANGUAGE

Never claim “done” ambiguously.

Use:

**CONCEPT**

**DESIGNED**

**STUBBED**

**IMPLEMENTED**

**COMPILED**

**AUTOMATED-TESTED**

**PLAYTESTED**

**PROFILED**

**INDEPENDENTLY REVIEWED**

**ACCEPTED**

**HUMAN-APPROVED**

---

# 44. NO FAKE APIs

AI agents must not silently invent Unreal APIs.

When uncertain:

- inspect installed headers;
- inspect project source;
- consult official documentation;
- verify version-specific behavior.

Clearly identify uncertain assumptions.

---

# 45. NO MASS CODE DUMPS

Do not generate an entire speculative game codebase in a single pass.

Use:

```text
Inspect
↓
Design
↓
Candidate approaches
↓
Choose experiment
↓
Implement smallest coherent slice
↓
Compile
↓
Test
↓
Profile
↓
Independent review
↓
Accept/reject
↓
Continue
```

---

# 46. FOUNDATIONAL EXPERIMENT LOOP

For important systems:

```text
Hypothesis
↓
Acceptance Criteria
↓
Candidate A / B / C
↓
Implementation
↓
Telemetry
↓
Playtest
↓
Performance
↓
Independent Critique
↓
Decision
↓
ADR
```

---

# 47. FAILURE IS ALLOWED

Agents are permitted and encouraged to conclude:

- candidate failed;
- architecture is wrong;
- feature is too expensive;
- current solution is mediocre;
- experiment should be deleted;
- assumptions need revision.

Do not preserve bad systems because time has already been invested.

---

# 48. QUALITY > FEATURE COUNT

One extraordinary vehicle is better than 50 mediocre vehicles.

One extraordinary track is better than a shallow open world.

One revolutionary mechanic is better than 20 copied mechanics.

One exceptional five-minute vertical slice is better than a broken “full game.”

---

# 49. GENESIS SUCCESS CRITERION

PROJECT GENESIS succeeds if:

1. driving is compelling with no production art;
2. controls feel precise;
3. speed bands feel meaningfully different;
4. 900 km/h remains readable and controllable by design;
5. transitions between speed regimes feel coherent;
6. camera meaningfully contributes to perceived speed;
7. vehicle dynamics demonstrate depth;
8. telemetry objectively characterizes behavior;
9. performance remains within defined budgets;
10. architecture is clean enough to support future engine evolution;
11. independent reviewers validate the claims;
12. playtesters describe the driving itself—not graphics—as distinctive.

---

# 50. FINAL GOVERNING PRINCIPLE

Protect the project from two opposite failures.

## Failure A — impossible futurism

Ideas sound impressive but never become compelling gameplay.

## Failure B — incremental conservatism

Everything works, but the result feels like a 2026 racing game.

Operate between them:

> Future-facing enough to surprise.
>
> Technically grounded enough to prototype.
>
> Physically coherent enough to master.
>
> Architecturally clean enough to evolve.
>
> Measurable enough to improve scientifically.
>
> Entertaining enough that players care.

All work now proceeds into:

# PROJECT GENESIS

**“Can we reinvent the feeling of speed?”**
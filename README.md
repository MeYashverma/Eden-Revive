# EDEN : Revive

A browser-based 3D living-world sandbox in **one file** (`index.html`). The only dependency is three.js r128, loaded from cdnjs. No build step, no backend, no keys.

## Play / deploy
- **Locally:** open `index.html` (internet needed once to fetch three.js).
- **GitHub Pages:** commit `index.html` (+ the other files) to the repo root on `main`, then *Settings → Pages → Source: GitHub Actions*. `.github/workflows/pages.yml` redeploys on every push. (Or choose *Deploy from a branch → main / root* and skip the workflow.) All paths are relative, so the `/Eden-Revive/` subpath works.

## Controls
WASD move · Shift sprint · Space jump/swim up · mouse look (arrow keys, or right-drag, if pointer lock is blocked) · V first/third person · G fly (X down) · Esc pause
1 Inspect (click or E) · 2 Sculpt (click raise, Shift+click lower, wheel = brush) · 3 Build house (R rotate, Shift+click demolish) · 4 Plant tree (Shift+click fell)
C follow selected citizen/animal · T time speed (pause/1x/8x/60x) · Z +6 h · Y change weather · M map · Q quality · K save · L load

## How it works
- **World:** seeded value-noise terrain (continents, hills, ridged mountains, river channels flooded at sea level) + player height edits on a 2 m grid. 64 m chunks stream around the player; vertex colours come from an 11-biome temperature/moisture/elevation/slope classifier.
- **Life:** deer graze regrowing grass cells, drink, flee wolves and the player, breed and starve; wolves scout, stalk, chase (stamina) and breed only while prey lasts. Citizens have hunger/energy/social needs and a utility-chosen daily routine (sleep, eat, work farm or wood, socialise). Farms follow the seasons and rain; village food stock limits growth, and famine kills.
- **Simulation:** substeps of at most 0.25 s. Full AI runs within ~230 m of the player; distant citizens use an abstract schedule model, distant animals are frozen.
- **Save:** `localStorage` (seed, clock, weather, terrain edits, houses, planted/felled trees, villages, people, animals). Autosaves every 90 s.

## Tests
`npm i && npm test` runs the game script headlessly with real three.js and a stubbed renderer: determinism, terrain continuity, generation, 24 h citizen schedule, predation, tools, save/reload, corrupt-save handling, Pages-path checks. It cannot check how anything *looks* on a GPU.

## Known limitations
No audio, IndexedDB, Web Workers, PBR textures or post-processing (no bloom/SSAO). Water is a flat animated sea-level plane, with no flow or flooding simulation. No fish, interiors, vehicles, roads, economy beyond village food, relationships, children, undo/redo, export/import, gamepad or touch. Biomes are static, and the map shows the whole area rather than only explored terrain. Visual quality has not been verified in a real browser.

## Extending
Species: add an `AG` entry (geometry), spawn rules in `spawnA`, an `up*` update function and a call in `sim`. Biomes: extend `BN`/`BH`/`DENS`/`CAPB` and `biome()`. Buildings: edit `hgeo`.

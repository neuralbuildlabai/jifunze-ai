# Hosted Articulate Rise — browser console notes

## “Missing manifest for remote entry `ai_scenario`”

**Origin:** Articulate Rise **runtime bundles** under `public/course-assets/rise/<course>/content/lib/rise/*.js` (e.g. `54ca246e.js`), **not** the Jifunze React app. A minified reference loads a Module Federation–style remote via `__loadRemoteEntry("ai_scenario")` and expects `window.ai_scenario`.

**Jifunze:** `src/` contains **no** references to `ai_scenario`. The app only **hosts** static HTML/JS from the Rise export.

**Impact:** If the course **still runs** and only the console shows this error, treat it as a **known third-party / export packaging** warning. A full self-contained web export may omit or split federated “remote entry” manifests for optional lesson types.

**If a lesson block is blank or broken:** The block type is almost certainly Rise’s **AI scenario** (or similarly named **AI / scenario** interactive). In Rise authoring, **replace that block** with a standard block (text, accordion, knowledge check, embed, etc.) and re-export the web package.

---

## “Unsatisfied version ^5.0.0 … shared singleton module `svelte`” (`@articulate/mondrian-bundles`)

**Origin:** Articulate **Mondrian** / Rise client bundles (`content/lib/mondrian/`, `content/index.html` `__CONFIG__` → `mondrian/entry.js`). This is **dependency sharing inside the Rise export**, not Svelte from the Jifunze Vite bundle.

**Jifunze:** Does not ship Svelte for learner Rise iframes/tabs; the warning is **internal to Articulate’s** federated/shared modules.

---

## Operational guidance

- **Do not** hand-edit generated Rise `*.js` in `public/course-assets/rise/…` unless there is a verified, reproducible break and no authoring-side fix.
- Prefer **re-export from Rise** or **swap block types** in the source course when a specific lesson fails.

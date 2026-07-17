# Air Force ROTC Detachment 520 — Cornell University

The detachment's public website: what the program is, how the four-year path
works, who the cadre are, and how a prospective cadet makes contact. It is
aimed at students and families deciding whether to join, so every page is
written to be read cold by someone who knows nothing about ROTC.

Live at **https://det520.privatepanda.co**

## Design

The site is built around a single idea — **an officer's commissioning dossier**:
operations-order discipline set against Ivy League heritage. That premise
decides the details, and the details are worth keeping consistent.

**Color carries meaning, not decoration.** The field is midnight navy
(`--ink-900`) with bone text (`--bone`) and steel for anything secondary. Two
accents are reserved and must not drift:

| Token | Reserved for |
| --- | --- |
| `--gold` | The commission — goals, honors, primary actions. Nothing else. |
| `--carnelian` | Cornell heritage — the crest and heritage eyebrows. Nothing else. |

Because they are rationed, they mean something when they appear. Spend gold on a
decorative border and the commission stops reading as the destination.

**Three typefaces, three voices.** Barlow Condensed is the command voice
(display, uppercase). Public Sans is the institutional voice (body copy). IBM
Plex Mono is for designators and data — course numbers, facts, small labels —
which is why it is set with tabular numerals.

**Structural conventions.** Dense hairline rules (`--line`) and tight grids
imply a briefing document rather than a brochure. Section spacing, gutters, and
type scale use `clamp()` so layouts breathe on a laptop and tighten on a phone
without extra breakpoints. Motion is minimal, gated behind
`prefers-reduced-motion`, and never load-bearing — content is fully readable
with JavaScript off.

**Accessibility is a constraint, not a pass at the end.** Body text holds at
least 4.5:1 contrast against its background (this is why `--steel-dim` is as
light as it is — a darker value failed on small labels). Navigation is keyboard
reachable, images carry real alt text, and the mobile nav manages
`aria-expanded`.

## Structure

```
src/                 everything that gets published
  index.html
  program/           /program/
  admissions/        /admissions/
  cadet-life/        /cadet-life/
  cadre/             /cadre/
  heritage/          /heritage/
  contact/           /contact/
  bio/<name>/        /bio/brougham/, /bio/ehlers/, …
  assets/css/site.css   the whole design system, one file
  assets/js/site.js     mobile nav + scroll reveal, no dependencies
  assets/img/
  CNAME
reference/           maintenance material, never published
.github/workflows/   deploy
```

Plain hand-written HTML. No framework, no build step, no dependencies —
Google Fonts is the only external request. Edit the HTML and CSS directly.

**One directory per page.** Each page is a `directory/index.html`, which is what
produces extensionless URLs like `/program/` on any static host, with no
server config and no build tooling.

**Links and asset references are root-absolute** (`/assets/css/site.css`,
`/program/`). This is required, not stylistic: a bio sits two levels deep, so
relative paths resolve differently per page. The tradeoff is that opening a file
over `file://` will not load styles — serve it over HTTP instead.

**The masthead and footer are duplicated in every page**, since there is no
include mechanism. A change to either has to be applied across all twelve files;
CSS changes, being shared, apply everywhere on their own.

**Cadre biographies are reproduced verbatim.** They follow a national standard
and are never paraphrased, trimmed, or reworded.

## Local development

```sh
cd src && python3 -m http.server 8000
```

Then open http://localhost:8000. Serving over HTTP (rather than opening the
files directly) is necessary for the root-absolute paths to resolve the same way
they do in production.

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which uploads `src/`
to GitHub Pages as-is and deploys it — roughly a minute end to end. There is no
build stage; what is in `src/` is what is served.

Only `src/` is published. Anything outside it — `reference/`, the workflow —
stays in the repository and never reaches the web. The custom domain is
configured in the repository's Pages settings and pinned by `src/CNAME`; both
must agree.

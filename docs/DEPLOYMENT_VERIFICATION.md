# Deployment verification

The Pages site for this repository is https://neversmile0825.github.io/ARC/.

The export uses base path `/ARC` so styles and scripts load from `/ARC/_next/`. `https://analyze-research-capital.site/` returned 404 on 2026-10-28 and is not attached to this repository.

`.github/workflows/pages.yml` runs the documentation tests, `npm test`, and `npm run build:pages`, then deploys Pages. The worker is not part of that workflow. `version.json` keeps `backend` as `not-deployed-with-pages`.

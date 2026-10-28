# Deployment

## Local UI

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Leave `ETHEREUM_RPC_URL` empty to use the public fallbacks (`rpc.mevblocker.io`, Tenderly, `0xrpc.io`, dRPC, publicnode). Paste a dedicated archive URL in Settings if a public endpoint rate-limits you. The value stays in IndexedDB.

## Checks

```bash
npm test          # unit tests and the captured SISH log replay
npm run lint      # tsc --noEmit
npm run build     # Next.js server build
$env:LIVE='1'; npm run test:live   # PowerShell: real mainnet read
```

## GitHub Pages

Pushes to `main` on https://github.com/NeverSMILE0825/ARC.git run `.github/workflows/pages.yml`. The pages build copies `app/api` outside the App Router, exports a static site with base path `/ARC`, and restores the API routes.

https://neversmile0825.github.io/ARC/

Indexing on that site happens in the browser. There is no Postgres there.

## Docker

```bash
docker compose up --build
```

- Web UI: http://localhost:3000
- Postgres: `postgres://arc:arc@localhost:5432/arc`
- Worker: indexes the `INDEX_TOKEN` argument. The compose file leaves that variable empty, so the worker does not start on a preset contract. Set any ERC-20 address when you want a run.

Run another token from the host:

```bash
DATABASE_URL=postgres://arc:arc@localhost:5432/arc npm run worker -- 0xYourToken
```

The image does not contain a wallet, a seed phrase, or a trading key.

## Backend status

`GET /api/status` on a `next start` or Docker web process reports RPC reachability and whether `DATABASE_URL` answered `select 1`. The `worker` field stays `observed: false`. Source code in `worker/indexer.ts` is not a running indexer.

Migrations run in order from `db/migrations/` when the worker or `persist` calls `migrate`. `002_indexes.sql` only adds indexes. Rollback of that file is `DROP INDEX` on `economic_trades_token_block_idx`, `raw_logs_block_idx`, `pools_token0_idx`, and `pools_token1_idx`. This environment did not start Postgres, so that SQL was reviewed and listed by a unit test, not applied to a live database.

Required variables are in `.env.example`: `BLOCKSCOUT_BASE_URL`, `ETHEREUM_RPC_URL`, `DATABASE_URL`, and the optional `INDEX_TOKEN`, `INDEX_MINUTES`, and `INDEX_MODE`. None of them are baked into the GitHub Pages bundle.

## API

These routes exist on the Docker / `next start` deployment. They are not part of the static Pages export.

- `GET /api/status`
- `GET /api/tokens/:ca/metadata`
- `GET /api/tokens/:ca/pools`
- `GET /api/tokens/:ca/launch`
- `GET /api/tokens/:ca/metrics?mode=launch&minutes=60`
- `GET /api/tokens/:ca/trades?cursor=`
- `GET /api/tokens/:ca/wallets?class=Sniper`
- `GET /api/tokens/:ca/comparisons?baseline=`
- `GET /api/analyze?ca=&mode=&minutes=`

`mode` is `launch`, `trailing`, or `absolute` (`start` and `end` as ISO timestamps). Responses are `unavailable` with a reason when logs cannot be read. They do not invent numbers.

# Agent instructions

ARC is a universal Ethereum launch intelligence platform. It is not a site for one token.

## Token neutrality

Do not hardcode a token name, ticker, contract address, liquidity amount, launch date, or historical trading result as a production default, placeholder, sample search, tutorial fill, or worker argument.

A real transaction may stay in `tests/fixtures` for replay. Do not import that fixture from `app/`, `components/`, or user-facing help.

## Documentation synchronization

If a change alters what a person sees or can do, update the Help article for that feature in the same change. Update the glossary when a formula changes. Set the article date. Refresh `lib/features/review-lock.json` with `updated` or `unchanged` and a note. A source hash mismatch fails `tests/neutrality.test.ts`.

## Feature accuracy

Help describes what the code does, including limits. Do not document a planned feature as available.

## No fabricated metrics

Do not present synthetic trades or a branding sample as a live token. Demo fixtures stay behind the demo switch and start off.

## Backward compatibility

Do not wipe a user’s saved snapshots, playbook, or brand records when changing the app.

## Verification

Run the typecheck and `npm test`. Do not call the task done until the affected Help text matches the new behavior.

## Completion rules

1. Never hardcode a specific token name, ticker, contract, liquidity amount, or historical result as a production default.
2. Never fabricate blockchain results, recall participants, or alert history.
3. Update Help after changing user-visible functionality, including the article date and the feature review lock.
4. Update tests when behavior changes.
5. Preserve existing working features and saved IndexedDB records.
6. Verify a claim of completion by running the check. A skipped live test is not a pass.
7. Document an external dependency that is not configured, including a model provider and the Pages worker, as unavailable.
8. Replay only stored chain events. Do not interpolate missing trades or change their timestamps when playback speed changes.
9. Recognition rates come only from saved or imported responses. Do not generate participants.
10. Keep editorial brand scores separate from collision records and from recognition rates.
11. Publish to `main` on https://github.com/NeverSMILE0825/ARC.git so GitHub Pages updates https://neversmile0825.github.io/ARC/. The Pages export uses base path `/ARC`.

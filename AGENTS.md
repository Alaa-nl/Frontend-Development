# Pokédex

A Pokédex app on live data from PokeAPI. Specs are in `specs/`.

- Expo Router, TanStack Query, expo-sqlite. Must run in Expo Go.
- Screens in `src/app/`, data through hooks in `src/hooks/`, API and SQL in `src/services/`.
- Colours, type colours and spacing in `src/constants/theme.ts`. Font: Rubik with Expo Font.
- Shared setup (API client, query client, database): reuse what is listed here, never add a second one. When you set up something new that other features will use, add a line here: what it is and where it lives.
- Before you write code for an issue: post a plan (which files, how, what you are unsure about) and a `- [ ]` task list as one comment on the issue with `gh issue comment`. Wait for my go. Tick off tasks with `gh issue comment --edit-last` while you build.
- After building: run `npx tsc --noEmit` and `npx expo lint`. Both must pass.
- No new dependencies without asking me first.

---

## Shared Setup

- **API Client**: `src/services/api.ts` - Fetch wrapper for PokeAPI (https://pokeapi.co/api/v2)
- **Query Client**: `src/services/queryClient.ts` - TanStack Query client with 5min stale time
- **Database**: `src/services/favorites.ts` - SQLite database (`pokedex.db`), initialized in `_layout.tsx`
- **Theme**: `src/constants/theme.ts` - Colors (#DC0A2D primary), spacing, type colors
- **Fonts**: Loaded in `src/app/_layout.tsx` - Rubik (Regular, Medium, Bold) from `assets/fonts/`
- **List Row Component**: `src/components/PokemonRow.tsx` - Reusable Pokemon row (80px fixed height)

---

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
- Lessons from building:
  - The full Pokémon name list is loaded once (`usePokemonList`, key `['pokemon', 'list']`). Search and Compare filter that list with `filterPokemon` in `src/services/filterPokemon.ts`. Never add a request per key press.
  - Lists with fixed-height rows use `getItemLayout`.
  - Keep screens simple: no extra UI libraries (for example tabs are plain buttons with local state).
  - Stat comparison logic lives in `src/services/compare.ts`, not in the screen.

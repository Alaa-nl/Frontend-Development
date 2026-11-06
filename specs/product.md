# Pokédex

A Pokédex app for Pokémon fans. You can scroll through all Pokémon, search
by name, open a Pokémon to see its details and evolutions, keep your
favorites, and compare two Pokémon side by side. All data comes live from
PokeAPI. The design follows the course Figma file.

## Core action

Find a Pokémon and see what it can do.

## Features

1. [List](./features/list.md): all Pokémon in a list, live from the API.
2. [Search](./features/search.md): find any Pokémon by part of its name.
3. [Detail](./features/detail.md): about, stats and evolution chain of one Pokémon.
4. [Favorites](./features/favorites.md): save Pokémon, still there after a restart.
5. [Compare](./features/compare.md): two Pokémon side by side, per stat who is stronger.

## Data

- **API**: [PokeAPI](https://pokeapi.co/docs/v2). Public, no key, no login.
- **Endpoints**:
  - `/pokemon?limit=...&offset=...`: names and URLs for the list and search.
  - `/pokemon/{id}`: number, artwork, types, stats, height, weight.
  - `/pokemon-species/{id}`: description text and the link to the evolution chain.
  - `/evolution-chain/{id}`: the evolution chain.
- **Stored on the phone**: table `favorites` in SQLite: `id`, `name`, `created_at`.

## Technical choices

- **Stored in SQLite**: the favorites (id, name, date added), not the
  Pokémon data itself, because PokeAPI is the source of truth and TanStack
  Query already caches it. SQLite, not AsyncStorage, because I sort favorites
  by date added and need a quick "is this a favorite?" check by `id`.
- **Native feature**: haptics (`expo-haptics`) when you tap the favorite
  button on the detail screen, so you feel that it worked. The alternative
  was Share, but a favorite tap is the action people do most.

## Technical core

- [ ] Runs in Expo Go
- [ ] Live data through TanStack Query
- [ ] At least 2 screens with Expo Router
- [ ] Something in SQLite that survives a restart
- [ ] Loading and error state on every load
- [ ] One native feature: haptics, on the favorite button (detail screen)
- [ ] TypeScript and ESLint without errors
- [ ] UI, data and logic in separate files

## Optional

- [ ] Clean TypeScript: no `any`, no `as` casts, no `@ts-ignore`
- [ ] Design: pixel perfect, as in the Figma file
- [ ] No warnings: no `console.log`, none in the terminal or on screen

## Out of scope

- Accounts or sync between phones.
- Moves, abilities, items, locations.
- Battles.
- A web version.

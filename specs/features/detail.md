# Detail

## Goal

Open one Pokémon and see who it is, its stats and how it evolves.

## Constraints

- Screen `src/app/pokemon/[id].tsx`, reachable from the list and from favorites.
- Data from `/pokemon/{id}`, `/pokemon-species/{id}` and `/evolution-chain/{id}`, each its own query.
- Type colours from the theme, as in the design.
- Haptics on the favorite button (`expo-haptics`).

## Acceptance Criteria

- [ ] Shows name, number, artwork and types in the type colour.
- [ ] Three tabs: About, Stats, Evolution. Switching is instant.
- [ ] The evolution chain comes from the API. Tapping a Pokémon in it opens its detail.
- [ ] A favorite button: tap to save, tap again to remove. I feel a short vibration.
- [ ] Loading and error state on the Pokémon and on the evolution chain.

## Out of Scope

- Moves, abilities, locations.
- Shiny or other artwork.

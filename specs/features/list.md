# List

## Goal

See all Pokémon in one list, so I can browse them and open one.

## Constraints

- Home screen: `src/app/index.tsx`.
- Data from PokeAPI `/pokemon` through TanStack Query, in a hook in `src/hooks/` and a service in `src/services/`.
- Number and artwork come from the id in the URL. No extra request per row.
- Rows as in the Figma design: artwork, number, name. Font Rubik with Expo Font, colours from `src/constants/theme.ts`.
- `FlatList`, so long lists scroll smoothly.

## Acceptance Criteria

- [ ] The list shows all ~1300 Pokémon, with artwork, number and name.
- [ ] Scrolling stays smooth, also at the end of the list.
- [ ] A loading state while the list loads.
- [ ] An error with a Retry button when the request fails.
- [ ] Tapping a row opens the detail screen of that Pokémon.

## Out of Scope

- Types or stats in the rows.
- Sorting or filters.

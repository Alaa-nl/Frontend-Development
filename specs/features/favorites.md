# Favorites

## Goal

Keep the Pokémon I like on their own screen, also after I close the app.

## Constraints

- Screen `src/app/favorites.tsx`, reachable from the home screen.
- SQLite with `expo-sqlite`, table `favorites` (`id`, `name`, `created_at`). SQL only in `src/services/`.
- Read and write through TanStack Query, so the list updates right after a change.
- Reuse the list row component.

## Acceptance Criteria

- [ ] Shows all favorites, newest first.
- [ ] Still there after a full restart of the app.
- [ ] No favorites shows an empty state with the text "No favorites yet".
- [ ] Tapping a favorite opens its detail screen.
- [ ] Removing a favorite on the detail screen removes it here too.

## Out of Scope

- Sorting options.
- Sync between phones.

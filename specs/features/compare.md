# Compare

## Goal

Put two Pokémon side by side and see who is stronger on each stat.

## Constraints

- Screen `src/app/compare.tsx`. Figma has no screen for this: follow its style (font, colours, cards).
- Pick each Pokémon with the same search as the home screen.
- Stats from `/pokemon/{id}`, reuse the detail query.
- The comparison logic (who wins per stat) in a function in `src/services/`, not in the screen.

## Acceptance Criteria

- [ ] I can pick two Pokémon.
- [ ] For each of the six stats I see both values next to each other.
- [ ] The higher value is highlighted. Equal values show as a tie.
- [ ] Loading and error state for each Pokémon.

## Out of Scope

- More than two Pokémon.
- A total winner or battle result.

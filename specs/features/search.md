# Search

## Goal

Find any Pokémon by typing part of its name, also one I have not scrolled to yet.

## Constraints

- On the home screen, above the list, as in the design. No new screen.
- PokeAPI has no search endpoint. Filter the full name list from the List feature on the phone. No extra request per key press.
- Reuse the list row component.

## Acceptance Criteria

- [ ] A search field at the top, as in the design.
- [ ] Results update while I type.
- [ ] Part of the name works, in any case: "PIKA" finds Pikachu.
- [ ] Finds every Pokémon, also near the end of the list.
- [ ] No match shows an empty state with the text "No Pokémon found".

## Out of Scope

- Search by number or type.
- Search history.

# Explanation

## 1. My technical choices

**SQLite for favorites.** I store only the favorites (`id`, `name`, `created_at`), not the Pokémon data, because PokeAPI is the source of truth and TanStack Query already caches it.

- The table is created in `src/services/favorites.ts` line 21 (`CREATE TABLE IF NOT EXISTS favorites`), and the database opens on line 18.
- It starts when the app starts: `src/app/_layout.tsx` line 20 calls `initDatabase()`.
- Newest first: `src/services/favorites.ts` line 46 (`ORDER BY created_at DESC`).
- The hooks that read and write it are in `src/hooks/useFavorites.ts`. After add or remove they invalidate the `favorites` query, so the favorites screen updates right away.

**Haptics on the favorite button.** `src/app/pokemon/[id].tsx` line 57: `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` runs when I tap the favorite button.

Did a choice change? No. Both stayed as written in `specs/product.md`. One small change: the favorites table and hooks were built in issue #3 (Detail) and not in #4, because the favorite button on the detail screen already needs to save.

## 2. One feature from API call to screen: Search (#2)

1. `src/services/api.ts`: `apiGet` does the fetch to PokeAPI and throws on an error.
2. `src/services/pokemon.ts`: `fetchPokemonList` asks `/pokemon?limit=100000` once and gets all names. `extractPokemonId` takes the id from the URL, so no extra request per row is needed.
3. `src/hooks/usePokemonList.ts`: wraps that in `useQuery` with key `['pokemon', 'list']`, so the list is cached.
4. `src/services/filterPokemon.ts`: `filterPokemon` makes the text and the names lowercase and keeps the names that include the text. That is why PIKA finds Pikachu.
5. `src/app/index.tsx`: keeps what I type in `useState`, runs `filterPokemon` in `useMemo` (line 14), and shows the result in a `FlatList` with `PokemonRow`. No match shows No Pokémon found.

Search makes no request per key press. It filters the list that is already loaded.

## 3. A suggestion I changed

In the plan for issue #1 (comment on the issue) the agent did not say how it would load the full list or keep scrolling smooth. Before I said go I changed two things:

- Load the whole list in **one request** (`limit=100000`), so search could reuse the same query later without new requests.
- Give rows a **fixed height** and use `getItemLayout`, so scrolling stays smooth at the end of the ~1300 rows.

You can see it in the chat `chat-history/issue-1.json` (my go message), in `src/services/pokemon.ts` line 35 and `src/app/index.tsx` (`getItemLayout`). Commit `a56337b`.

In issue #3 I also told the agent to make the tabs simple buttons with local state, and not add a tab library.

Note: during issue #3 Claude Code stopped because my credit ran out. The code for #3 was already written. I checked it with `tsc` and `lint` and committed it myself. Issues #4 and #5 were built without Claude Code, with the database and hooks from #3.

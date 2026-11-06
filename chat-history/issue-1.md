## USER

Work on issue #1. Read AGENTS.md, specs/product.md and specs/features/list.md. You may touch src/app/, src/hooks/, src/services/, src/components/, src/constants/theme.ts and AGENTS.md. This issue also sets up the shared parts: query client, API client, theme, Rubik font (already in assets/fonts) and the list row component. Add each one to AGENTS.md. Answers to likely questions: the Expo project already exists. You may add @tanstack/react-query, nothing else. expo-image is already installed, use it. I have no Figma access for you: use a clean Pokedex style with red #DC0A2D as primary. Tapping a row may go to a small placeholder src/app/pokemon/[id].tsx for now. Keep ids above 10000. Post the plan and a - [ ] task list as one comment on the issue with gh issue comment, then stop and wait for my go.

## ASSISTANT

I'll read the required files to understand the project structure and requirements, then create a plan for issue #1.

## ASSISTANT

[tool: Bash] {"command": "gh issue view 1", "description": "View issue #1 details"}

## ASSISTANT

[tool: Read] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/AGENTS.md"}

## ASSISTANT

[tool: Read] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/specs/product.md"}

## ASSISTANT

[tool: Read] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/specs/features/list.md"}

## ASSISTANT

Now let me check the current project structure to understand what exists:

## ASSISTANT

[tool: Bash] {"command": "ls -la src/", "description": "Check src directory structure"}

## ASSISTANT

[tool: Read] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/package.json"}

## ASSISTANT

[tool: Bash] {"command": "ls -la assets/fonts/", "description": "Check if Rubik fonts exist"}

## ASSISTANT

Let me check the current app structure:

## ASSISTANT

[tool: Bash] {"command": "find src/app -type f -name \"*.tsx\" -o -name \"*.ts\" | head -20", "description": "List existing app files"}

## ASSISTANT

[tool: Read] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/app/_layout.tsx"}

## ASSISTANT

[tool: Read] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/app/index.tsx"}

## ASSISTANT

Now I have all the information I need. Let me create a comprehensive plan and task list for issue #1:

## ASSISTANT

[tool: Bash] {"command": "gh issue comment 1 --body \"## Plan for Issue #1: List Feature Setup\n\n### Overview\nThis issue sets up the foundational infrastructure for the Pok\u00e9dex app and implements the list f

## ASSISTANT

Perfect! I've posted a comprehensive plan and task list to issue #1. The plan includes:

## Summary

**Architecture:**
- API client for PokeAPI base configuration
- TanStack Query client for data fetching/caching
- Theme with #DC0A2D primary color and Rubik font
- Reusable PokemonRow component
- Proper hook/service separation

**Files to create:**
- 8 new files (theme, services, hooks, components, detail placeholder)
- 3 files to modify (index, layout, AGENTS.md)

**Approach:**
- Clean Pokedex design style
- FlatList for smooth scrolling
- expo-image for performance
- Extract Pokemon ID from URL (no extra requests)
- Loading and error states

The task list has 13 checkboxes that I'll tick off as I work. Now waiting for your go signal to proceed with implementation! 🎯

## USER

Go, with two changes to your plan: 1) fetch the whole list in one request (/pokemon?limit=100000) so search can reuse the same query later. 2) give rows a fixed height and use getItemLayout so scrolling stays smooth at the end. Tick off the tasks with gh issue comment --edit-last while you build. When tsc and lint pass, commit with the message: List screen, closes #1 and push.

## ASSISTANT

Perfect! I'll implement with those changes. Let me start by installing the dependency and creating the shared infrastructure.

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "in_progress", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "pe

## ASSISTANT

[tool: Bash] {"command": "npx expo install @tanstack/react-query", "description": "Install TanStack Query"}

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "in_p

## ASSISTANT

[tool: Bash] {"command": "gh issue comment 1 --edit-last --body \"## Plan for Issue #1: List Feature Setup\n\n### Overview\nThis issue sets up the foundational infrastructure for the Pok\u00e9dex app and implement

## ASSISTANT

Now let me create the theme file:

## ASSISTANT

[tool: Bash] {"command": "mkdir -p src/constants", "description": "Create constants directory"}

## ASSISTANT

[tool: Write] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/constants/theme.ts", "content": "// Pok\u00e9dex theme: colors, spacing, and type colors\n\nexport const colors = {\n  primary: '#DC0

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Bash] {"command": "mkdir -p src/services", "description": "Create services directory"}

## ASSISTANT

[tool: Write] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/services/api.ts", "content": "// API client for PokeAPI\n\nconst BASE_URL = 'https://pokeapi.co/api/v2';\n\nexport class ApiError ext

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Write] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/services/queryClient.ts", "content": "// TanStack Query client setup\n\nimport { QueryClient } from '@tanstack/react-query';\n\nexpor

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Write] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/services/pokemon.ts", "content": "// Pokemon API service functions\n\nimport { apiGet } from './api';\n\nexport interface PokemonList

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Bash] {"command": "mkdir -p src/hooks", "description": "Create hooks directory"}

## ASSISTANT

[tool: Write] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/hooks/usePokemonList.ts", "content": "// Hook for fetching the complete Pokemon list\n\nimport { useQuery } from '@tanstack/react-que

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Bash] {"command": "mkdir -p src/components", "description": "Create components directory"}

## ASSISTANT

[tool: Write] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/components/PokemonRow.tsx", "content": "// Reusable Pokemon list row component\n\nimport { Image } from 'expo-image';\nimport { Link 

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Bash] {"command": "mkdir -p src/app/pokemon", "description": "Create pokemon directory"}

## ASSISTANT

[tool: Write] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/app/pokemon/[id].tsx", "content": "// Placeholder Pokemon detail screen\n\nimport { useLocalSearchParams } from 'expo-router';\nimpor

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Edit] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/app/_layout.tsx", "old_string": "import { Stack } from \"expo-router\";\n\nexport default function RootLayout() {\n  return <Stack />

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Edit] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/app/index.tsx", "old_string": "import { Text, View, StyleSheet } from \"react-native\";\n\nexport default function Index() {\n  retur

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Edit] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/AGENTS.md", "old_string": "---\n\nThis is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cro

## ASSISTANT

Now let me update the issue comment and run the TypeScript and linting checks:

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Bash] {"command": "gh issue comment 1 --edit-last --body \"## Plan for Issue #1: List Feature Setup\n\n### Overview\nThis issue sets up the foundational infrastructure for the Pok\u00e9dex app and implement

## ASSISTANT

[tool: Bash] {"command": "npx tsc --noEmit", "description": "Run TypeScript check", "timeout": 60000}

## ASSISTANT

I need to fix the TypeScript error in the getItemLayout function:

## ASSISTANT

[tool: Edit] {"file_path": "/Users/alaadrobe/Documents/Frontend-Development/src/app/index.tsx", "old_string": "  const getItemLayout = (_data: PokemonWithId[] | null | undefined, index: number) => ({\n    length: 

## ASSISTANT

[tool: Bash] {"command": "npx tsc --noEmit", "description": "Run TypeScript check again", "timeout": 60000}

## ASSISTANT

Great! TypeScript passes. Now let's run the linter:

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Bash] {"command": "npx expo lint", "description": "Run ESLint check", "timeout": 60000}

## ASSISTANT

Perfect! Both checks pass. Now let me update the issue comment and commit:

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

[tool: Bash] {"command": "gh issue comment 1 --edit-last --body \"## Plan for Issue #1: List Feature Setup\n\n### Overview\nThis issue sets up the foundational infrastructure for the Pok\u00e9dex app and implement

## ASSISTANT

[tool: Bash] {"command": "git add -A && git commit -m \"List screen, closes #1\"", "description": "Commit changes"}

## ASSISTANT

[tool: Bash] {"command": "git push", "description": "Push to remote repository"}

## ASSISTANT

[tool: TodoWrite] {"todos": [{"content": "Install @tanstack/react-query", "status": "completed", "activeForm": "Installing @tanstack/react-query"}, {"content": "Create theme.ts with colors and spacing", "status": "comp

## ASSISTANT

Perfect! Issue #1 is complete! 🎉

## Summary

I've successfully implemented the List feature with all shared infrastructure:

### ✅ Created Files:
1. **`src/constants/theme.ts`** - Colors (#DC0A2D primary), spacing, and type colors
2. **`src/services/api.ts`** - API client wrapper for PokeAPI
3. **`src/services/queryClient.ts`** - TanStack Query client with 5min stale time
4. **`src/services/pokemon.ts`** - Pokemon API functions (fetches entire list in one request with limit=100000)
5. **`src/hooks/usePokemonList.ts`** - Hook for fetching Pokemon list
6. **`src/components/PokemonRow.tsx`** - Reusable row component with 80px fixed height
7. **`src/app/pokemon/[id].tsx`** - Placeholder detail screen

### ✅ Modified Files:
- **`src/app/_layout.tsx`** - Added QueryClientProvider and Rubik font loading
- **`src/app/index.tsx`** - Implemented FlatList with getItemLayout for smooth scrolling
- **`AGENTS.md`** - Documented all shared setup components

### ✅ Key Features:
- Full Pokemon list fetched in one request for search reuse later
- Fixed row height (80px) with getItemLayout for smooth scrolling at the end
- Loading state with spinner
- Error state with retry button
- Clean Pokedex design with red #DC0A2D primary color
- Rubik font family throughout
- expo-image for optimal performance
- TypeScript and ESLint both pass ✅

The commit has been pushed and issue #1 is now closed! 🚀

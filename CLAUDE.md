# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
use Bun as the package manager and bundler.

## Code Style Guidelines
- **TypeScript**: Strict type checking enabled. Use proper type definitions for all components and functions.
- **Components**: Use functional components with proper type interfaces for props.
- **Imports**: Group imports by external libraries first, then internal modules.
- **Naming**: Use PascalCase for components and interfaces, camelCase for variables and functions.
- **Styling**: Use Tailwind CSS with the `cn` utility for class conditionals.
- **Error Handling**: Use proper error boundaries and conditional rendering for error states.
- **State Management**: Use React hooks for component state.
- **File Structure**: Keep related files together, organize by feature or domain.
- **Component Props**: Define interfaces for all component props at the top of the file.
- **Path Aliases**: Use `@/*` path alias for imports from project root.

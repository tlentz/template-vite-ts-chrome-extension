# template-vite-ts-chrome-extension
Template repository for building chrome extensions with Vite + Typescript + CrxJS

## Directory Structure
- `public` - Static assets
- `src` - Source code
- `src/assets` - Static assets for bundling
- `src/pages` - Entry points for the extension
- `src/pages/background` - Background Scripts (required)
- `src/pages/content` - Content Scripts (optional)
- `src/pages/popup` - Popup Page (optional)
- `src/shared` - Shared code
- `dist` - Output directory
- `packaged` - Packed extension

## Commands
- `npm install` - Install dependencies
- `npm run build` - Build the extension
- `npm run pack` - Build and pack the extension in zip format

## Development
Whenever you make a change to the extension, run `npm run build` to build the extension and reload the extension in the browser.
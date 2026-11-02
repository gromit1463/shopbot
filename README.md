# Shopbot

pnpm + Turborepo monorepo.

```
apps/
  api/            Express API (ESM): barcode lookup + session tokens
  web/            (add) Next.js web build
  mobile/         (add) React Native / Expo app
packages/
  shared/         @shopbot/shared      types + barcode helpers, used by every app
  api-client/     @shopbot/api-client  typed fetch client for the API, works in web and React Native
```

## Commands

```sh
pnpm install
pnpm build        # builds packages/* first, then apps
pnpm dev          # watches packages and runs the API on :4200
pnpm typecheck
```

The API reads `apps/api/.env` in dev (copy `apps/api/.env.example`). In production, inject the same variables through your host.

## Adding the apps

Create them from the repo root so they join the workspace:

```sh
pnpm dlx create-next-app@latest apps/web
pnpm dlx create-expo-app@latest apps/mobile
```

Then give each one the shared packages (use the `name` from each app's package.json for `--filter`):

```sh
pnpm add @shopbot/shared @shopbot/api-client --workspace --filter <web-package-name>
pnpm add @shopbot/shared @shopbot/api-client --workspace --filter <mobile-package-name>
```

```ts
import { createShopbotClient } from '@shopbot/api-client'

const api = createShopbotClient({
	baseUrl: process.env.EXPO_PUBLIC_API_URL!, // NEXT_PUBLIC_API_URL on web
	getAccessToken: () => tokenStore.access,
})

const { access, refresh } = await api.startSession()
const product = await api.lookupBarcode('012345678905')
```

If Metro fails to resolve workspace packages under pnpm, add `node-linker=hoisted` to a root `.npmrc` and reinstall.

## Adding a new shared package

Copy `packages/shared` (package.json, tsconfig.json, `src/`), rename it to `@shopbot/<name>`, and add it as a `workspace:*` dependency wherever it is used. Packages build to `dist/` so Node, Next and Metro all consume plain ESM plus type declarations.

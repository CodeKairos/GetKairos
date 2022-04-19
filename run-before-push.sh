#!/bin/bash
pnpm run jsonServer &
npx vite --port 3333 &
pnpm run lint
pnpm run typecheck
npx vitest --run
# pnpm run build
npx cypress run --spec 'cypress/integration/*.spec.ts' 

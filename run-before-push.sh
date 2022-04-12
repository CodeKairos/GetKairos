#!/bin/bash
pnpm run lint
pnpm run typecheck
npx vitest --run
npx cypress run --spec 'cypress/integration/*.spec.ts'

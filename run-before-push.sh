#!/bin/bash

if [[ `lsof -i tcp:3000` == "" ]]
then
echo strating json-server
pnpm run jsonServer &
fi

pnpm run lint
pnpm run typecheck
npx vitest --run

# pnpm run build

# if [[ `lsof -i tcp:3333` == "" ]]
# then
# echo strating vite
# npx vite --port 3333 &
# fi
# npx cypress run --spec 'cypress/integration/*.spec.ts' 

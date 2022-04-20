#!/bin/bash
if [[ `lsof -i tcp:3000` == "" ]]
then
echo strating json-server
pnpm run jsonServer &
fi
pnpm run test
# npx cypress run --spec 'cypress/integration/remote.spec.ts'
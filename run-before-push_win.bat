
for /f %%i in ('netstat -aof ^| findstr :3000') do set RESULT=%%i

IF "%result%" == "" (START /MIN pnpm run jsonServerWin)

pnpm run lint && pnpm run typecheck && npx vitest --run
@echo off
title KidSecure - Setup and Run
echo.
echo  =============================================
echo    KidSecure - Child-Friendly Password System
echo  =============================================
echo.

:: ── Check Node.js ──────────────────────────────
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js not found.
    echo  Please install it from https://nodejs.org and re-run this script.
    pause & exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo  [OK] Node.js %NODE_VER% found.

:: ── Install pnpm if missing ──────────────────────
where pnpm >nul 2>&1
if %errorlevel% neq 0 (
    echo  [INFO] Installing pnpm...
    call npm install -g pnpm --silent
)

:: ── Install dependencies ─────────────────────────
echo.
echo  [1/3] Installing dependencies...
call pnpm install --silent
if %errorlevel% neq 0 (
    echo  [ERROR] Dependency installation failed.
    pause & exit /b 1
)
echo  [OK] Dependencies installed.

:: ── Create .env if missing ───────────────────────
if not exist .env (
    echo  [INFO] Creating default .env file...
    (
        echo JWT_SECRET=kidsecure-local-dev-secret-do-not-use-in-production
        echo VITE_ANALYTICS_ENDPOINT=
        echo VITE_ANALYTICS_WEBSITE_ID=
    ) > .env
    echo  [OK] .env created.
)

:: ── Database auto-setup ──────────────────────────
echo.
echo  [2/3] Setting up database...
if not exist data mkdir data
if not exist drizzle\meta\_journal.json (
    call pnpm exec drizzle-kit generate --silent 2>nul
)
call pnpm exec drizzle-kit migrate 2>nul
echo  [OK] Database ready.

:: ── Start server ─────────────────────────────────
echo.
echo  [3/3] Starting server...
echo.
echo  =============================================
echo    App running at: http://localhost:3000
echo    Press Ctrl+C to stop.
echo  =============================================
echo.

call pnpm exec cross-env NODE_ENV=development node --import tsx/esm server/_core/index.ts

pause

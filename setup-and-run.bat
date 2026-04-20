@echo off
echo ============================================
echo   KidSecure - Setup and Run
echo ============================================
echo.

:: Check if Node is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found. Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: Check if pnpm is installed, install if not
where pnpm >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Installing pnpm...
    npm install -g pnpm
)

echo [1/3] Installing dependencies...
call pnpm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo [2/3] Approving native build scripts (better-sqlite3, esbuild)...
call pnpm approve-builds --yes 2>nul
if %errorlevel% neq 0 (
    :: Try reinstalling with builds allowed
    call pnpm install --config.unsafe-perm=true 2>nul
)

echo.
echo [3/3] Setting up database...
mkdir data 2>nul
call pnpm exec drizzle-kit generate 2>nul
call pnpm exec drizzle-kit migrate
if %errorlevel% neq 0 (
    echo [INFO] Database may already be set up, continuing...
)

echo.
echo ============================================
echo   Starting KidSecure on http://localhost:3000
echo   Press Ctrl+C to stop the server
echo ============================================
echo.

set NODE_ENV=development
call pnpm exec cross-env NODE_ENV=development node --import tsx/esm server/_core/index.ts
pause

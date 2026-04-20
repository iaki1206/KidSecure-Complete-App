# KidSecure 🐾

**A child-friendly graphical password authentication system.**  
Children create and recall passwords by selecting animals across 4 rounds — no typing required.

---

## ▶️ Run KidSecure from GitHub

**Requirements:** [Node.js](https://nodejs.org) installed (v22+)

**Step 1 — Clone the repo:**
```bash
git clone https://github.com/iaki1206/KidSecure-Complete-App.git
cd KidSecure-Complete-App
```

**Step 2 — Double-click `setup-and-run.bat`**

That's it! The script automatically:
- Installs all dependencies
- Sets up the SQLite database
- Starts the app at **http://localhost:3000**

> No MySQL, no database server, no manual configuration needed. Everything is self-contained.

---

## ✨ Features

- 🖼️ **Graphical passwords** — pick 4 animals instead of typing text  
- 🔒 **Strong security** — PBKDF2 hashing, 390,625+ combinations, 3-attempt lockout  
- 🧒 **Child-friendly UI** — large buttons, emoji feedback, step-by-step guidance  
- 🔑 **Password recovery** — security questions fallback  
- 📊 **Testing dashboard** — usability metrics and security analysis at `/testing`  
- 🗄️ **SQLite** — no database server needed, works out of the box  

---

## 🖥️ Manual Setup (Mac / Linux / Windows terminal)

```bash
# 1. Install dependencies
pnpm install

# 2. Create .env file
cp .env.example .env       # then set JWT_SECRET to any random string

# 3. Start dev server (Mac/Linux)
pnpm dev

# Windows PowerShell alternative:
# $env:NODE_ENV="development"; node --import tsx/esm server/_core/index.ts
```

Open **http://localhost:3000** in your browser.

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 19, TypeScript, Tailwind CSS 4, shadcn/ui |
| Backend    | Node.js, Express 4, tRPC 11 |
| Database   | SQLite (via better-sqlite3 + Drizzle ORM) |
| Auth       | Custom graphical password — PBKDF2 + salt |
| Bundler    | Vite 7 + esbuild |

---

## 📁 Project Structure

```
├── client/          # React frontend
│   └── src/
│       ├── pages/   # Home, Login, Register, RecoverPassword, Testing
│       └── components/
├── server/          # Express + tRPC backend
│   ├── _core/       # Server entry, context, auth middleware
│   ├── db.ts        # SQLite database functions
│   ├── routers.ts   # tRPC API routes
│   └── security.ts  # Password hashing, validation
├── shared/          # Shared types, animal data, security questions
├── drizzle/         # DB schema + migrations
├── setup-and-run.bat  # Windows one-click launcher
└── railway.toml     # Cloud deployment config (Railway)
```

---

## 🌐 Deploy Online (Railway)

1. Go to [railway.app](https://railway.app) → **Login with GitHub**
2. **New Project** → **Deploy from GitHub repo** → select this repo
3. Add environment variables:
   ```
   JWT_SECRET=your-random-secret
   NODE_ENV=production
   ```
4. Add a **Volume** mounted at `/data`, then add:
   ```
   DATABASE_PATH=/data/kidsecure.db
   ```
5. Click **Generate Domain** → your app is live! 🎉

---

## 🔒 Security

| Feature | Detail |
|---------|--------|
| Password hashing | PBKDF2, 100,000 iterations, 32-byte salt |
| Password space | 390,625 combinations (25⁴) |
| Brute-force protection | 3 attempts → 5-minute lockout |
| Session security | HTTP-only cookies, JWT signed |
| Shoulder-surfing resistance | Animal grid randomised each round |

---

## 📄 License

MIT — developed as academic coursework (Software Development CW1, February 2026).

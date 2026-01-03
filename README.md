
# 🧩 nextjs-panel

A CLI toolkit to rapidly scaffold **dashboard UIs** and **RESTful APIs** in your **Next.js (App Router)** projects using your **Prisma** database schema.

![npm](https://img.shields.io/npm/v/nextjs-panel?color=blue)
![License](https://img.shields.io/npm/l/nextjs-panel)
![Made for Next.js](https://img.shields.io/badge/next.js-supported-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## 🚀 Features

- ⚡ Auto-generate forms, tables, and API routes from Prisma models
- 📦 Works out-of-the-box with Next.js App Router
- 🛠️ Supports RESTful API generation
- 🧱 Schema-driven resource scaffolding
- 🧩 Built-in support for add/edit UI forms

---

## 📦 Installation

```bash
npm install nextjs-panel
```

---

## 🛠️ Quick Start Guide

Follow the steps below to generate a complete dashboard in minutes:

### 1. Install the package

```bash
npm install nextjs-panel
```

### 2. Run setup

```bash
npx nextjs-panel setup
```

> This sets up necessary files and folder structure for the admin panel.

### 3. Initialize Prisma

```bash
npx prisma init
```

### 4. Configure your database

Edit the generated `prisma/schema.prisma` file and set your database:

```prisma
datasource db {
  provider = "postgresql" // or mysql, sqlite, etc.
  url      = env("DATABASE_URL")
}
```

Update your `.env` file with the correct `DATABASE_URL`.

### 5. Sync your database schema

```bash
# For existing database:
npx prisma db pull

# For new schema:
npx prisma db push
```

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Create your first resource

```bash
npx nextjs-panel make:resource user
```

> This will generate:
> - `app/admin/users/page.tsx` – Admin dashboard page
> - `app/api/users/route.ts` – REST API for CRUD
> - Dynamic forms & tables powered by Prisma

---

## 🧪 Example

Given a `User` model in `prisma/schema.prisma`:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

Run:

```bash
npx nextjs-panel make:resource user
```

This will instantly scaffold everything you need to **view, create, update, and delete** users in your dashboard.

---

## 📁 Generated Folder Structure

```
app/
├── admin/
│   └── users/
│       └── page.tsx        # Dashboard view
└── api/
    └── users/
        └── route.ts        # RESTful API
```

---

## 🧩 Roadmap

- [ ] Field-level validation
- [ ] Role-based access control
- [ ] File/image upload fields
- [ ] Relationship support
- [ ] Dark mode theming
- [ ] CLI config customization

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

### Development setup

```bash
git clone https://github.com/yourusername/nextjs-panel.git
cd nextjs-panel
npm install
```

---

## 📄 License

MIT © [Parvinder Singh](https://github.com/parvinder8607)

---

## 💬 Feedback

If you have any feedback, ideas, or questions, feel free to open an issue or reach out!

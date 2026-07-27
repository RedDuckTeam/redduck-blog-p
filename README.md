<p align="center">
  <a href="https://redduck.io">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/images/redduck-logo-dark.svg">
      <img src="public/images/redduck-logo.svg" alt="RedDuck" width="240">
    </picture>
  </a>
</p>

<h1 align="center">RedDuck <a href="https://blog.redduck.io">Blog</a></h1>

<p align="center">
  <b>Thoughts, updates and deep dives from the RedDuck team.</b>
</p>

---

## 🧰 Built with

- ⚡ [TanStack Start](https://tanstack.com/start) — full-stack React framework
- ⚛️ React 19 + TypeScript
- 🎨 [Tailwind CSS](https://tailwindcss.com/) v4
- 🧱 [Shadcn](https://ui.shadcn.com/) — UI primitives
- ☁️ [Cloudflare Workers](https://workers.cloudflare.com/) — hosting

## 🚀 Getting started

> Use **pnpm** to install or run the project.

```bash
pnpm install
pnpm db:setup
pnpm dev
```

The blog will be waddling at `http://localhost:3000`, seeded with a handful of demo posts.

## 📜 Scripts

| Command           | What it does                               |
| ----------------- | ------------------------------------------ |
| `pnpm dev`        | Start the dev server                       |
| `pnpm build`      | Build for production                       |
| `pnpm preview`    | Preview the production build               |
| `pnpm db:setup`   | Set up a local database with demo content  |
| `pnpm test`       | Run unit tests (Vitest)                    |
| `pnpm lint`       | Lint the code                              |
| `pnpm typecheck`  | Type-check without emitting                |

## 📄 License

[MIT](./LICENSE) © RedDuck Limited

<h1 align='center'>Blogx</h1>

The Blogx Website has been built with the following tech stack:

-   [Nextjs](https://nextjs.org/)
-   [Tailwind](https://tailwindcss.com/)
-   [daisyui](https://daisyui.com/)
-   [Prisma](https://www.prisma.io/)
-   [Postgresql](https://www.postgresql.org/)


## Development

# Setup Procedure

- Docker

  OR

- Copy .env.example to .env
- Get a postgres db from https://neon.tech/ (or any other provider)
- Replace the DATABASE_URL in .env
- Run `npx prisma migrate dev` to setup schema

# Steps to run locally

With Docker

- `docker compose up`

Without Docker

- `npm install`
- `npm run db:seed` to seed the database
- `npm run dev`

---

Read [contributing guidelines](./CONTRIBUTING.md) to start making contributions

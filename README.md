This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Genera migraciones con el siguiente comando:
npx typeorm migration:generate -n InitialMigration

## Luego, ejecuta las migraciones en la base de datos:
npx typeorm migration:run


## Ve al panel de configuración de tu proyecto en Vercel y añade las variables de entorno necesarias para conectar con tu base de datos. Por ejemplo:
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-database-user
DB_PASS=your-database-password
DB_NAME=your-database-name


## Actualizar Configuración para Vercel:

import { createConnection } from 'typeorm';

createConnection({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/entities/**/*.ts'],
  synchronize: false,
  migrations: [__dirname + '/migration/**/*.ts'],
}).then(() => {
  console.log('Database connected');
}).catch(error => console.log('Database connection error: ', error));


## api consulta datos departamentos
https://github.com/joseluisq/ubigeos-peru
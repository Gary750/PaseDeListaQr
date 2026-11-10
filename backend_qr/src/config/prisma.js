import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { Pool } = pg;

// La cadena de conexión se toma de las variables de entorno, tanto en local
// como en producción (Render). En Render usa la URL interna de Postgres si el
// servicio está en la misma región; la URL externa ya incluye sslmode=require.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL no está definida. Configúrala en el entorno antes de iniciar el servidor.'
  );
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter
});

export default prisma;
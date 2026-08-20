import { PrismaClient } from '@prisma/client';

/** PgBouncer in transaction mode cannot reuse named prepared statements. */
function withPgBouncer(url: string): string {
  if (/[?&]pgbouncer=/i.test(url)) return url;
  return url.includes('?') ? `${url}&pgbouncer=true` : `${url}?pgbouncer=true`;
}

export function createExportPrisma(): PrismaClient {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    throw new Error('DATABASE_URL is required');
  }
  return new PrismaClient({
    datasources: { db: { url: withPgBouncer(raw) } },
  });
}

/**
 * Create a USER who can log in immediately (bcrypt, same as auth.service).
 *
 *   npm run user:create -- --name "Nayem" --mobile 01516552894 --password secret123
 *   npx tsx --env-file=.env scripts/create-user.ts --name "Nayem" --mobile 01516552894 --password secret123
 */

import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const SALT_ROUNDS = 12;
const BD_MOBILE = /^01[3-9]\d{8}$/;

type Cli = { name: string; mobile: string; password: string };

function argValue(args: string[], name: string): string | undefined {
  const prefix = `--${name}=`;
  const hit = args.find((a) => a.startsWith(prefix));
  if (hit) return hit.slice(prefix.length);
  const idx = args.indexOf(`--${name}`);
  if (idx >= 0 && args[idx + 1] && !args[idx + 1]!.startsWith('--')) return args[idx + 1];
  return undefined;
}

function parseCli(argv: string[]): Cli {
  const args = argv.slice(2);
  const named = {
    name: argValue(args, 'name'),
    mobile: argValue(args, 'mobile'),
    password: argValue(args, 'password'),
  };
  const positional = args.filter((a) => !a.startsWith('--'));
  const name = named.name ?? positional[0];
  const mobile = named.mobile ?? positional[1];
  const password = named.password ?? positional[2];

  if (!name || !mobile || !password) {
    throw new Error(
      'Usage: npm run user:create -- --name "Full Name" --mobile 01XXXXXXXXX --password SECRET',
    );
  }

  const trimmedName = name.trim();
  const trimmedMobile = mobile.trim();

  if (trimmedName.length === 0 || trimmedName.length > 100) {
    throw new Error('name must be 1–100 characters');
  }
  if (!BD_MOBILE.test(trimmedMobile)) {
    throw new Error('mobile must be an 11-digit Bangladeshi number (01[3-9]XXXXXXXX)');
  }
  if (password.length < 6 || password.length > 100) {
    throw new Error('password must be 6–100 characters');
  }

  return { name: trimmedName, mobile: trimmedMobile, password };
}

async function main() {
  const input = parseCli(process.argv);
  const prisma = new PrismaClient();

  try {
    const existing = await prisma.user.findUnique({
      where: { mobile: input.mobile },
      select: { id: true },
    });
    if (existing) {
      throw new Error(`User already exists for mobile ${input.mobile}`);
    }

    const hashed = await bcrypt.hash(input.password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        name: input.name,
        mobile: input.mobile,
        password: hashed,
        role: 'USER',
        isActive: true,
      },
      select: { id: true, name: true, mobile: true, role: true, isActive: true, createdAt: true },
    });

    console.log('User created');
    console.log(`  id:     ${user.id}`);
    console.log(`  name:   ${user.name}`);
    console.log(`  mobile: ${user.mobile}`);
    console.log(`  role:   ${user.role}`);
    console.log(`  active: ${user.isActive}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error('Create user failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});

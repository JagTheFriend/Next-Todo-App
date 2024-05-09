import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

type CreatePrismaClient = () => PrismaClient;

const createPrismaClient: CreatePrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<CreatePrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

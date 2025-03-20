import { sql } from '@vercel/postgres'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export { prisma, sql } 
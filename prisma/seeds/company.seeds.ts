import { PrismaClient, Role, Status } from '@prisma/client';
import { hashSync } from 'bcrypt';

export async function seedCompany(prisma: PrismaClient) {
  await prisma.company.createMany({
    data: [
      {
        name: 'Company One',
      },
    ],
  });

  console.log('Company seed added successfully 🌱.');
}

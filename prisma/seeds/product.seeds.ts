import { PrismaClient, Role, Status } from '@prisma/client';
import { hashSync } from 'bcrypt';

export async function seedProduct(prisma: PrismaClient) {
  const company = await prisma.company.findFirst();
  await prisma.product.createMany({
    data: [
      {
        name: 'Product One',
        price: 19.99,
        companyId: company.id,
      },
      {
        name: 'Product Two',
        price: 29.99,
        companyId: company.id,
      },
    ],
  });

  console.log('Product seed added successfully 🌱.');
}

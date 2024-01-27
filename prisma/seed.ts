import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const bob = await prisma.user.upsert({
    where: { id: "tmp-user" },
    update: {},
    create: {
      id: "tmp-user",
      name: "Bob Ross",
    },
  });
  console.log(bob);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

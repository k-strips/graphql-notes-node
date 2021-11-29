const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.address.findUnique({
        where: { email: "user@example.com"}
    })

    console.log(user)
  }
  
  // 4
main()
    .catch(e => {
      throw e
    })
    // 5
    .finally(async () => {
      await prisma.$disconnect()
})
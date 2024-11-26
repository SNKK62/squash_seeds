import { PrismaClient } from "@prisma/client";

// import { setPlayerData } from "./seeds/players.seed";
import { setUniversityData } from "./seeds/university.seed";

const prisma = new PrismaClient();

async function main() {
  await setUniversityData(prisma);
  setTimeout(async () => {
    // await setPlayerData(prisma);
  }, 2000);
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

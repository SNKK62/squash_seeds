import { PrismaClient } from "@prisma/client";
import { setUniversityData } from "./seeds/university.seed";
import { setPlayerData } from "./seeds/players.seed";

const prisma = new PrismaClient();

async function main() {
  await setUniversityData(prisma);
  setTimeout(async () => {
    await setPlayerData(prisma);
  }, 2000);
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
import { setUniversityData } from "./university.seed";
import { setPlayerData } from "./players.seed";

const prisma = new PrismaClient();

async function main() {
  await setUniversityData(prisma);
  await setPlayerData(prisma);
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

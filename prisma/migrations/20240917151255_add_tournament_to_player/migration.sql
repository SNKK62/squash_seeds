-- AlterTable
ALTER TABLE "players" ADD COLUMN     "tournament_id" TEXT NOT NULL DEFAULT 'clzc2hgox0000jldva3g234j5';

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

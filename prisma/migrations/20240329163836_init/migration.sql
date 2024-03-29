/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todo";

-- CreateTable
CREATE TABLE "universities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournaments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "is_open" BOOLEAN NOT NULL DEFAULT true,
    "is_team" BOOLEAN NOT NULL,
    "begin_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gakurens" (
    "id" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "university_id" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hash_salt" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,

    CONSTRAINT "gakurens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "university_id" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "is_retired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_metas" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tournament_id" TEXT NOT NULL,
    "is_rated" BOOLEAN NOT NULL,

    CONSTRAINT "match_metas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seed_metas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seed_metas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seeds" (
    "seed_meta_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "rank" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "winner_id" TEXT NOT NULL,
    "loser_id" TEXT NOT NULL,
    "is_defo" BOOLEAN NOT NULL,
    "winner_game_count" INTEGER NOT NULL,
    "loser_game_count" INTEGER NOT NULL,
    "winner_game1_score" INTEGER,
    "winner_game2_score" INTEGER,
    "winner_game3_score" INTEGER,
    "winner_game4_score" INTEGER,
    "winner_game5_score" INTEGER,
    "loser_game1_score" INTEGER,
    "loser_game2_score" INTEGER,
    "loser_game3_score" INTEGER,
    "loser_game4_score" INTEGER,
    "loser_game5_score" INTEGER,
    "tournament_id" TEXT NOT NULL,
    "match_meta_id" TEXT NOT NULL,
    "created_by_gakuren_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gakurens_email_key" ON "gakurens"("email");

-- CreateIndex
CREATE UNIQUE INDEX "seeds_seed_meta_id_rank_key" ON "seeds"("seed_meta_id", "rank");

-- AddForeignKey
ALTER TABLE "gakurens" ADD CONSTRAINT "gakurens_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_metas" ADD CONSTRAINT "match_metas_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seeds" ADD CONSTRAINT "seeds_seed_meta_id_fkey" FOREIGN KEY ("seed_meta_id") REFERENCES "seed_metas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seeds" ADD CONSTRAINT "seeds_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_loser_id_fkey" FOREIGN KEY ("loser_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_match_meta_id_fkey" FOREIGN KEY ("match_meta_id") REFERENCES "match_metas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_created_by_gakuren_id_fkey" FOREIGN KEY ("created_by_gakuren_id") REFERENCES "gakurens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

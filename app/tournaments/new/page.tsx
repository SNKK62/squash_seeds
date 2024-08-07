import { cookies } from "next/headers";

import { CreateTournamentForm } from "@/components/form/createTournamentForm";

import { GakurenWithAuthData } from "@repository/gakuren.repo";

async function CreateTournamentPage() {
  let isAuth = false;
  try {
    const res = await fetch(
      `${process.env["NEXT_PUBLIC_ORIGIN"]}/api/auth/login`,
      {
        cache: "no-store",
        headers: {
          Cookie: cookies().toString(),
        },
      }
    );
    if (!res.ok) {
      throw new Error("Not authorized");
    }

    const data: GakurenWithAuthData = (await res.json()).data;

    if (data.gakuren.role !== "幹部") {
      throw new Error("Not authorized");
    }
    isAuth = true;
  } catch {
    isAuth = false;
  }
  return <>{isAuth ? <CreateTournamentForm /> : <div>権限がありません</div>}</>;
}

export default CreateTournamentPage;

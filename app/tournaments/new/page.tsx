import { cookies } from "next/headers";

import { CreateTournamentForm } from "@/components/form/createTournamentForm";

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

    const data = (await res.json()).data;

    if (data.role !== "幹部") {
      throw new Error("Not authorized");
    }
    isAuth = true;
  } catch {
    isAuth = false;
  }
  return <>{isAuth ? <div>権限がありません</div> : <CreateTournamentForm />}</>;
}

export default CreateTournamentPage;

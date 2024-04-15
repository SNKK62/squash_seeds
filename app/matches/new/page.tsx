import { CreateMatchForm } from "@/components/form/createMatchForm";
import { cookies } from "next/headers";

async function CreateMatchPage() {
  try {
    const res = await fetch(`${process.env["ORIGIN"]}/api/tournament/open`, {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
    });
    const json = await res.json();
    if (res.status !== 200) {
      throw new Error(json.error);
    }

    return <CreateMatchForm />;
  } catch (e) {
    return <div>開催されている大会はありません</div>;
  }
}

export default CreateMatchPage;

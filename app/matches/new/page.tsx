import { CreateMatchForm } from "@/components/form/createMatchForm";
import { cookies } from "next/headers";

async function CreateMatchPage() {
  const res = await fetch(`${process.env["ORIGIN"]}/api/tournament/open`, {
    cache: "no-store",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (res.status !== 200) {
    return <div>開催されている大会はありません</div>;
  }

  return <CreateMatchForm />;
}

export default CreateMatchPage;

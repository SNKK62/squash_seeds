import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SignupForm } from "@/components/form/signupForm";

async function SignupPage() {
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
    if (res.ok) {
      isAuth = true;
    }
  } catch {
    isAuth = false;
  }

  if (isAuth) {
    redirect("/tournament/matches/notAnnounced");
  }

  try {
    const res = await fetch(
      `${process.env["NEXT_PUBLIC_ORIGIN"]}/api/universities`,
      {
        cache: "no-store",
      }
    );
    const data = (await res.json()).data;

    return <SignupForm universitiesJson={data} />;
  } catch (e) {
    return <div>{String(e)}</div>;
  }
}

export default SignupPage;

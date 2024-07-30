import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/form/loginForm";

async function LoginPage() {
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
  return <LoginForm />;
}

export default LoginPage;

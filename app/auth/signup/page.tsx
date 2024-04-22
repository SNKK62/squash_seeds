import { SignupForm } from "@/components/form/signupForm";

async function SignupPage() {
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

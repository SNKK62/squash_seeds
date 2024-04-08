import React from "react";
import { SignupForm } from "@/components/form/signupForm";
import Link from "next/link";

function SignupPage() {
  return (
    <>
      <SignupForm />
      <div className="flex justify-center">
        <Link href="/auth/login" className="underline text-blue-500">
          アカウントをお持ちの方はこちら
        </Link>
      </div>
    </>
  );
}

export default SignupPage;

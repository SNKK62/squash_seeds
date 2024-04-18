import Link from "next/link";
import React from "react";

import { SignupForm } from "@/components/form/signupForm";

function SignupPage() {
  return (
    <>
      <SignupForm />
      <div className="flex justify-center">
        <Link href="/auth/login" className="text-blue-500 underline">
          アカウントをお持ちの方はこちら
        </Link>
      </div>
    </>
  );
}

export default SignupPage;

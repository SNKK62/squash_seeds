import Link from "next/link";
import React from "react";

import { LoginForm } from "@/components/form/loginForm";

function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className="flex justify-center">
        <Link href="/auth/signup" className="text-blue-500 underline">
          初めての方はこちら
        </Link>
      </div>
    </>
  );
}

export default LoginPage;

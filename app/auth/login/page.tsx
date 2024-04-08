import React from "react";
import { LoginForm } from "@/components/form/loginForm";
import Link from "next/link";

function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className="flex justify-center">
        <Link href="/auth/signup" className="underline text-blue-500">
          初めての方はこちら
        </Link>
      </div>
    </>
  );
}

export default LoginPage;

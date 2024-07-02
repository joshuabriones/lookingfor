"use client";

import { signIn } from "next-auth/react";

const Button = () => {
  return <button onClick={() => signIn()}>Sign in</button>;
};

export default Button;

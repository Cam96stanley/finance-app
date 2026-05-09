"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "../primitives/Button";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 h-16 bg-primary rounded-b-md">
      <Image src={'/logo.svg'} alt="" width={121} height={21}/>
      <Show when="signed-out">
        <div className="flex gap-4">
          <SignInButton>
            <Button variant={'secondary'}>Login</Button>
          </SignInButton>
          <SignUpButton>
            <Button variant={'secondary'}>Sign Up</Button>
          </SignUpButton>
        </div>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </header>
  );
}

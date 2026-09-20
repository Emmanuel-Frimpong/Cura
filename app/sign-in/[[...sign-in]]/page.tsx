import { SignIn } from "@clerk/nextjs";

/** Renders Clerk's sign-in interface. */
export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}

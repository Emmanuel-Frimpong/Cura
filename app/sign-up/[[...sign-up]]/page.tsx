import { SignUp } from "@clerk/nextjs";

/** Renders Clerk's sign-up interface. */
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
    </div>
  );
}

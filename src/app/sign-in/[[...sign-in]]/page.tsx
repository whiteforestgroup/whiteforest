import { SignIn } from "@clerk/nextjs";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function SignInPage() {
  return (
    <div className="bg-app-bg flex min-h-screen items-center justify-center">
      {clerkEnabled ? (
        <SignIn />
      ) : (
        <p className="text-fg-muted max-w-sm text-center text-sm">
          Sign-in isn&apos;t configured yet — set
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to enable it.
        </p>
      )}
    </div>
  );
}

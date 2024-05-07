import { SignIn, SignUp } from "@clerk/nextjs";

export default function AuthPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { type: "sign-in" | "sign-up" };
}) {
  const authType = searchParams?.type || "sign-in";

  return (
    <>
      <h1 className="cursor-pointer text-2xl transition-all hover:underline">
        This is a demo Todo App built with Next.js App Router
      </h1>
      {authType === "sign-up" ? (
        <SignUp routing="hash" signInUrl="/auth?type=sign-in" />
      ) : (
        <SignIn routing="hash" signUpUrl="/auth?type=sign-up" />
      )}
    </>
  );
}

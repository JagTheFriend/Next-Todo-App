import { SignIn, SignUp } from "@clerk/nextjs";

export default function AuthPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { authType: "sign-in" | "sign-up" };
}) {
  const authType = searchParams?.authType || "sign-in";

  return (
    <>
      <h1 className="cursor-pointer text-2xl transition-all hover:underline">
        This is a demo Todo App built with Next.js App Router
      </h1>
      {authType === "sign-up" ? (
        <SignUp routing="hash" />
      ) : (
        <SignIn routing="hash" />
      )}
    </>
  );
}

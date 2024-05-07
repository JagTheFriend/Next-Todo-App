import { SignIn, SignUp } from "@clerk/nextjs";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { type: "sign-in" | "sign-up" };
}) {
  const searchParam = searchParams?.type || "sign-in";
  return (
    <>
      <h1 className="cursor-pointer text-2xl transition-all hover:underline">
        Please {searchParam === "sign-in" ? "login" : "register"} to use this
        Todo App built with Next.js App Router.
      </h1>
      {searchParam === "sign-in" ? (
        <SignIn routing="hash" />
      ) : (
        <SignUp routing="hash" />
      )}
    </>
  );
}

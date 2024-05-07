import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const user = await currentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#56a360] to-[#323adb] text-white">
      {!user && (
        <>
          <h1 className="cursor-pointer text-2xl transition-all hover:underline">
            This is a demo Todo App built with Next.js App Router
          </h1>
          <SignIn routing="hash" />
        </>
      )}
    </main>
  );
}

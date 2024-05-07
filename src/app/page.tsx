import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { db } from "~/server/db";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    return notFound();
  }

  const todos = await db.todo.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#56a360] to-[#323adb] text-white">
      <>
        <h1 className="cursor-pointer text-2xl transition-all hover:underline">
          This is a demo Todo App built with Next.js App Router
        </h1>
      </>
    </main>
  );
}

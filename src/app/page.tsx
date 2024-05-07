import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { db } from "~/server/db";

async function DisplayUsername() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center justify-center">
      <h1 className="cursor-default truncate font-medium underline sm:text-3xl md:text-3xl lg:text-5xl">
        Welcome{" "}
        {user.username ??
          user.firstName ??
          user.lastName ??
          user.fullName ??
          "User"}
        !
      </h1>
    </div>
  );
}

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
    <main>
      <section>
        <DisplayUsername />
      </section>
    </main>
  );
}

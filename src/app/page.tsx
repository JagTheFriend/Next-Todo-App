import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import DisplayInputField from "~/component/InputField";
import { db } from "~/server/db";

async function DisplayUsername() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center justify-center">
      <h1 className="cursor-default truncate text-5xl font-medium underline">
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

async function DisplayTodos() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const todos = await db.todo.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ul className="mt-4 flex list-disc flex-col items-center">
      {todos.map((todo) => (
        <li key={todo.id} className="items-center border-b-2 pt-2">
          <div className="flex flex-row items-center gap-4">
            <p className="truncate text-2xl">{todo.content}</p>
            <button type="button" className="btn btn-outline btn-error">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    return notFound();
  }

  return (
    <main>
      <section>
        <DisplayUsername />
      </section>
      <section>
        <DisplayInputField />
      </section>
      <section>
        <DisplayTodos />
      </section>
    </main>
  );
}

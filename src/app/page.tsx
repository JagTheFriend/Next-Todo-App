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

async function DisplayTodos() {
  const user = await currentUser();
  if (!user) {
    return null;
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
    <div className="mt-4 flex flex-col items-center justify-center">
      <div className="overflow-x-auto">
        <table className="table-zebra table">
          {/* head */}
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Date Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id}>
                <th>{index + 1}</th>
                <td>{todo.content}</td>
                <td>{todo.createdAt.toDateString()}</td>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
        <DisplayTodos />
      </section>
    </main>
  );
}

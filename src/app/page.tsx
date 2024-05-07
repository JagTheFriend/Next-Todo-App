import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import addTodo from "~/actions";

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

function DisplayInputField() {
  return (
    <form
      className="mx-4 mt-4 flex flex-col items-center justify-center gap-4"
      action={addTodo}
    >
      <input
        type="text"
        name="content"
        placeholder="Todo Name"
        className="input input-bordered input-accent w-full max-w-lg"
      />
      <button type="submit" className="btn btn-primary btn-outline">
        Add TODO
      </button>
    </form>
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
    </main>
  );
}

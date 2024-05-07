import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import DisplayInputField from "~/component/InputField";

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

function DisplayTodos() {
  return <></>;
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

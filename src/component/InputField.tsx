"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import addTodo from "~/actions";

export default function DisplayInputField() {
  const [inputContent, setInputContent] = useState("");

  return (
    <form
      className="mx-4 mt-4 flex flex-col items-center justify-center gap-4"
      action={addTodo}
    >
      <input
        type="text"
        name="content"
        placeholder="Todo Name"
        className="input input-accent w-full max-w-lg"
        onInput={(e) => setInputContent(e.currentTarget.value.trim())}
      />
      <SubmitButton inputContent={inputContent} />
    </form>
  );
}

function SubmitButton({ inputContent }: { inputContent: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-primary btn-outline"
      disabled={inputContent.length === 0 || pending}
    >
      {pending ? (
        <span className="loading loading-dots loading-md" />
      ) : (
        "Add TODO"
      )}
    </button>
  );
}

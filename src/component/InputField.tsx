"use client";
import { useState } from "react";
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
      <button
        type="submit"
        className="btn btn-primary btn-outline"
        disabled={inputContent.length === 0}
      >
        Add TODO
      </button>
    </form>
  );
}

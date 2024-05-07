"use client";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Bounce, toast } from "react-toastify";
import addTodo from "~/actions";

export default function DisplayInputField() {
  const [inputContent, setInputContent] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className="mx-4 mt-4 flex flex-col items-center justify-center gap-4"
      action={async (formData) => {
        const data = await addTodo(formData);
        if (data?.error) {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
        formRef.current?.reset();
      }}
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

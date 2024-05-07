"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "./server/db";

export default async function addTodo(formData: FormData) {
  const content = formData.get("content")?.toString() ?? "";
  const { userId } = auth();

  if (!content) {
    return { error: true, message: "Please enter a todo name" };
  }

  if (!userId) {
    return { error: true, message: "Please sign in" };
  }

  try {
    await db.todo.create({
      data: {
        authorId: userId,
        content,
      },
    });
  } catch (error) {
    return { error: true, message: "An Error Occurred" };
  }
  revalidatePath("/");
}

export async function deleteTodo(postId: string) {
  const { userId } = auth();
  if (!userId) {
    return { error: true, message: "Please sign in" };
  }

  try {
    await db.todo.delete({
      where: { id: postId, AND: [{ authorId: userId }] },
    });
  } catch (error) {
    return { error: true, message: "An Error Occurred" };
  }
  revalidatePath("/");
}

"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createSnippet = async (
  formState: { message: string },
  formData: FormData
) => {
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be at least 3 characters long",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be at least 10 characters long",
      };
    }

    await db.snippets.create({
      data: {
        title,
        code,
      },
    });
    revalidatePath("/");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: "Something went wrong",
    };
  }
  //In try block it will give error
  redirect("/");
};
export const editSnippet = async (id: number, code: string) => {
  await db.snippets.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippets.delete({
    where: {
      id,
    },
  });
  revalidatePath("/", "page");
  redirect("/");
};

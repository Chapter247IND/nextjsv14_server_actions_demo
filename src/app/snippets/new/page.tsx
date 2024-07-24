"use client";
import { useFormState } from "react-dom";
import { createSnippet } from "@/actions";

const SnippetCreatePage = () => {
  const [formState, action] = useFormState(createSnippet, { message: "" });

  // const createSnippet = async (formData: FormData) => {
  //   "use server";
  //   const title = formData.get("title") as string;
  //   const code = formData.get("code") as string;

  //   const snippet = await db.snippets.create({
  //     data: {
  //       title,
  //       code,
  //     },
  //   });
  //   console.log("🚀 ~ createSnippets ~ snippet:", snippet);
  //   revalidatePath("/", "page");
  //   redirect("/");
  // };

  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a new Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        {formState.message ? (
          <div className="my-2 p-2 border rounded bg-red-200 border-red-400">
            {formState.message}
          </div>
        ) : null}
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
};

export default SnippetCreatePage;

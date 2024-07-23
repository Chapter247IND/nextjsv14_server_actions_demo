import { redirect } from "next/navigation";
import { db } from "@/db";

const SnippetCreatePage = () => {
  const createSnippet = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    const snippet = await db.snippets.create({
      data: {
        title,
        code,
      },
    });
    console.log("🚀 ~ createSnippets ~ snippet:", snippet);
    redirect("/");
  };

  return (
    <form action={createSnippet}>
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
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
};

export default SnippetCreatePage;

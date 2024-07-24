import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteSnippet } from "@/actions";

interface ISnippetShowPage {
  params: {
    id: string;
    title: string;
    code: string;
  };
}

const SnippetShowPage = async (props: ISnippetShowPage) => {
  const { params } = props;

  const snippet = await db.snippets.findFirst({
    where: {
      id: Number(params.id),
    },
  });

  if (!snippet) notFound();

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </>
  );
};

export const generateStaticParams = async () => {
  const snippets = await db.snippets.findMany();
  return snippets.map((snippet) => ({
    id: snippet.id.toString(),
  }));
};

export default SnippetShowPage;

import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from 'next/link'

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

  return (
    <>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link href={`/snippets/${snippet.id}`} className="p-2 border rounded">Edit</Link>
          <button className="p-2 border rounded">Delete</button>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </>
  );
};

export default SnippetShowPage;

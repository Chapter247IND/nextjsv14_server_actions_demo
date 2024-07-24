import { db } from "@/db";
import Link from "next/link";

// export const dynamic = "force-dynamic";

const Home = async () => {
  const snippets = await db.snippets.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        className="flex items-center justify-between border rounded p-2"
        href={`/snippets/${snippet.id}`}
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center m-2">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link className="border rounded p-2" href="/snippets/new">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
};

export default Home;

import { notFound } from "next/navigation";
import { db } from "@/db";
import SnippetEditForm from "@/components/SnippetEditForm";

interface ISnippetEditPage {
  params: {
    id: string;
  };
}
const SnippetEditPage = async (props: ISnippetEditPage) => {
  const { params } = props;

  const snippet = await db.snippets.findFirst({
    where: { id: Number(params.id) },
  });

  if (!snippet) notFound();

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
};

export default SnippetEditPage;

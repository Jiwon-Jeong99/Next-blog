import { useRouter } from "next/router";

// external modules
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { read } from 'to-vfile';

const MainDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  return (
    <div>
      {id}
    </div>
  )
}

export default MainDetailPage;

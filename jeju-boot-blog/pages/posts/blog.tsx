import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import { getPostBySlug } from "../../lib/posts";

// interface allPostsDataProps {
//   fileNames?: string;
//   getAllData?: [];
// }

type getPostBySlug = () => string[] | null;
type allPostsData = string[] | null;

export async function getStaticProps() {
  const allPostsData = await getPostBySlug();
  allPostsData = JSON.parse(JSON.stringify(allPostsData))
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Blog({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Blog</title>
      </Head>
      <h1>Blog</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <div>
        {allPostsData?.map(({ id, date, title }) => (
          <li key={id}>
            {title}
            {id}
            {date}
          </li>
        ))}
      </div>
    </Layout>
  );
}

import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import { getPostBySlug } from "../../lib/posts";
import { title } from "process";

interface allPostsDataProps {
  fileNames?: string;
  getAllData?: [];
}

export async function getStaticProps(getPostBySlug:allPostsDataProps) {
  const allPostsData = getPostBySlug();
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

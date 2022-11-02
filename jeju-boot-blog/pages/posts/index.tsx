import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import { getPostData, getPostBySlug, getSortedPostsData } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";

export async function getStaticProps() {
  const allData = getSortedPostsData();
  return {
    props: {
      allData,
    },
  };
}

export default function Blog({ allData }) {
  return (
    <Layout>
      <Head>
        <title>Next Blog</title>
      </Head>
      <h1>Next로 Blog 만들어찌</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <div>
        {allData?.map(({ id, date, title }) => (
          <Layout>
            <li key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                {allData.title}
              </Link>
              <br />
              {allData.id}
              <br />
              {allData.date}
              <br />
            </li>
          </Layout>
        ))}
      </div>
    </Layout>
  );
}

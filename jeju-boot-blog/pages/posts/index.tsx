import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import { getPostBySlug } from "../../lib/posts";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getPostBySlug();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Blog({ allPostsData }) {
  console.log(allPostsData);
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
        {allPostsData?.map(({ id, date, title }) => (
          <li key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              {title}
            </Link>
            <br />
            {id}
            <br />
            {date}
            <br />
          </li>
        ))}
      </div>
    </Layout>
  );
}

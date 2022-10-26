import React from "react";
import Layout from "../../components/layout";
import { getAllPostIds } from "../../lib/posts";
import { getPostBySlug } from "../../lib/posts";

export async function getStaticProps({ params }) {
  const allPostsData = getPostBySlug();
  return {
    props: {
      allPostsData,
    },
  };
}

const Post = ({ allPostsData }) => {
  console.log(allPostsData);
  return (
    <Layout>
      {allPostsData.title}
      <br />
      {allPostsData.data}
      <br />
      {allPostsData.data}
    </Layout>
  );
};

export default Post;

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

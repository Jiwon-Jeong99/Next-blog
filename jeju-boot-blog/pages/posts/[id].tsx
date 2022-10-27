import React from "react";
import Layout from "../../components/layout";
import { getAllPostIds, getPostBySlug } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPostsData = await getPostBySlug();
  return {
    props: {
      allPostsData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: true,
  };
};

const Post = ({ allPostsData, paths }) => {
  console.log(allPostsData);
  return (
    <Layout>
      {allPostsData.title}
      <br />
      {allPostsData.id}
      <br />
      {allPostsData.date}
      <br />
      {allPostsData.data}
    </Layout>
  );
};

export default Post;

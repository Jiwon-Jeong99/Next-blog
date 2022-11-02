import React from "react";
import Layout from "../../components/layout";
import { getPostData, getPostBySlug } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPostsData = await getPostData(params.id);
  return {
    props: {
      allPostsData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostBySlug();
  return {
    paths,
    fallback: true,
  };
};

const Post = ({ allPostsData }) => {
  console.log(allPostsData);
  return (
    <Layout>
      {allPostsData.title}
      <br />
      {allPostsData.id}
      <br />
      {allPostsData.date}
      <br />
      <div dangerouslySetInnerHTML={{__html: allPostsData.contentHtml}} />
    </Layout>
  );
};

export default Post;

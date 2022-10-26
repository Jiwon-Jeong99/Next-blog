// react-next
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

// styles
import styles from '@/styles/Home.module.css';

// posts

// data
import Post from '@data/post.data';

// external modules
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import fm from 'front-matter';


export default function Home({ posts }: {posts: {data: Post}[]}) {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>제주 blog ~~~</title>
        <meta
          name="description"
          content="오디세이랩 지켜점주 제주 일기"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          posts.map((post)=>(
            <div key={post.data.id}>
              <Link
                href={`/${post.data.id}`}
              >
                <div>
                  <span>{post.data.comment}</span>
                  <span>{post.data.date}</span>
                </div>
              </Link>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  // const file = await unified()
  //   .use(remarkParse)
  //   .use(remarkHtml)
  //   .process(await read('__posts/1025.md'));

  // console.log(String(file));
  const postRoot = '__posts';

  const files = fs.readdirSync(path.join(postRoot));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(postRoot, filename), 'utf-8'
    )

    const { data: fm } = matter(markdownWithMeta);
    return { data: fm }
  });
  
  return {
    props: {
      posts: posts
    },
  }
}

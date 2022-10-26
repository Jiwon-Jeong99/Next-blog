// react-next
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

// styles
import styles from '@/styles/Home.module.css';

// posts

// data
import Post, {getPostItems} from '@/data/post.data';

export default function Home({ posts }: {posts: Post[]}) {
  
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
            <div key={post.id}>
              <Link
                href={`/${post.id}`}
              >
                <div>
                  <span>{post.comment}</span>
                  <span>{post.date}</span>
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

  const posts = (await getPostItems()).map(
    item => item.post
  )
  
  return {
    props: {
      posts: posts
    },
  }
}

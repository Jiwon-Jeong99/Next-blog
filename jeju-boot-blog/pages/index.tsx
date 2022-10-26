import Link from "next/link";
import Container from "../components/container";
import Layout from "../components/layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog with jiwon</title>
        </Head>
        <Container>
          <h1 className="title">
            Read <Link href="/posts/index">this page!</Link>
          </h1>
        </Container>
      </Layout>
    </>
  );
}

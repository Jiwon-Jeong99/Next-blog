import Link from "next/link";
import Container from "../components/container";
import Layout from "../components/layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <h1 className="title">
        Read <Link href="/posts/blog">this page!</Link>
      </h1>
    </>
  );
}

// THIS FILE HAS BEEN GENERATED WITH THE TINA CLI.
// @ts-nocheck
import Head from "next/head";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../../tina/__generated__/client";
import { PromoBanner } from "@repo/ui/PromoBanner";

const BlogPage = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  if (!data || !data.post) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{data.post.title} | Mi Arquitectura Enterprise</title>
      </Head>

      <div className="min-h-screen bg-white text-slate-900">
        <nav className="border-b border-slate-100 py-4 mb-16">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <span className="font-bold text-xl text-blue-600">
              Enterprise Stack
            </span>
            <a
              href="/checkout"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-full font-semibold"
            >
              Demo Checkout
            </a>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-6 pb-24">
          <header className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl m-8 text-center leading-tight font-extrabold tracking-tighter text-slate-950">
              {data.post.title}
            </h1>
          </header>

          <div className="text-lg leading-relaxed text-slate-700 space-y-6">
            <TinaMarkdown components={components} content={data.post.body} />
          </div>
        </article>

        <footer className="bg-slate-50 border-t border-slate-100 py-10 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
            Demo de Arquitectura Enterprise | Turborepo, Vercel, TinaCMS,
            Recurly
          </div>
        </footer>
      </div>
    </>
  );
};

const components = {
  PromoBanner: (props) => (
    <PromoBanner
      headline={props.headline}
      bgColor={props.bgColor}
      textColor={props.textColor}
    />
  ),
};

export const getStaticProps = async ({ params }) => {
  let data = {};
  let query = {};
  let variables = { relativePath: `${params.filename}.mdx` };
  try {
    const res = await client.queries.post(variables);
    query = res.query;
    data = res.data;
    variables = res.variables;
  } catch {}

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection();
  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: false,
  };
};

export default BlogPage;

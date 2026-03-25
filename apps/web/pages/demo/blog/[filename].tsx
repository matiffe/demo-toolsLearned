// THIS FILE HAS BEEN GENERATED WITH THE TINA CLI.
// @ts-nocheck
import Head from "next/head";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../../tina/__generated__/client";
import { PromoBanner } from "@repo/ui/PromoBanner";

const markdownComponents = {
  p: (props) => <p className="w-full text-center leading-relaxed" {...props} />,
  h1: (props) => (
    <h1
      className="w-full text-center text-4xl font-extrabold tracking-tight text-slate-950 first:mt-0 md:text-5xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="w-full border-b border-slate-200 pb-2 text-center text-3xl font-bold tracking-tight text-slate-950 first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="w-full text-center text-2xl font-semibold text-slate-900 first:mt-0"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="w-full text-center text-xl font-semibold text-slate-900"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="w-full list-inside list-disc space-y-2 text-center marker:text-slate-400"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="w-full list-inside list-decimal space-y-2 text-center marker:text-slate-400"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mx-auto w-full border-t border-slate-200 pt-4 text-center italic text-slate-600"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-700/40"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-slate-900" {...props} />
  ),
  em: (props) => <em className="italic" {...props} />,
  hr: (props) => (
    <hr className="mx-auto w-full max-w-xs border-slate-200" {...props} />
  ),
  code: ({ className, children, ...props }) => {
    const isBlock =
      typeof className === "string" && className.includes("language-");
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: (props) => (
    <pre
      className="mx-auto max-w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-left text-sm text-slate-100 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
  /** Tina rich-text AST uses `code_block` for fenced code, not only `pre` */
  code_block: ({ value, lang, children }) => (
    <pre className="mx-auto max-w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-left text-sm text-slate-100 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
      <code className={lang ? `language-${lang}` : undefined}>
        {value ?? children}
      </code>
    </pre>
  ),
  img: (props) => {
    const src = props.src ?? props.url;
    const alt = props.alt ?? "";
    return (
      <img
        className="mx-auto block h-auto max-w-full rounded-lg border border-slate-200 shadow-sm"
        src={src}
        alt={alt}
      />
    );
  },
  /** Tina AST may use `image` instead of `img` */
  image: (props) => {
    const src = props.src ?? props.url;
    const alt = props.alt ?? "";
    return (
      <img
        className="mx-auto block h-auto max-w-full rounded-lg border border-slate-200 shadow-sm"
        src={src}
        alt={alt}
      />
    );
  },
};

/** Route param may be `slug` or `slug.mdx` depending on Tina `_sys.filename`. */
function relativePathFromRouteFilename(filename: string) {
  const base = filename.endsWith(".mdx")
    ? filename.slice(0, -".mdx".length)
    : filename;
  return `${base}.mdx`;
}

const components = {
  ...markdownComponents,
  PromoBanner: (props) => (
    <div className="w-full max-w-full">
      <PromoBanner
        headline={props.headline}
        bgColor={props.bgColor}
        textColor={props.textColor}
      />
    </div>
  ),
};

const BlogPage = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  if (!data?.post) {
    return (
      <>
        <Head>
          <title>Post | My Enterprise Architecture</title>
        </Head>
        <div className="grid min-h-screen place-items-center bg-white px-6 text-slate-600">
          <p>Unable to load this post.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{data.post.title} | My Enterprise Architecture</title>
      </Head>

      <div className="flex min-h-screen flex-col gap-8 bg-white text-slate-900">
        <article className="mx-auto flex w-full items-center justify-center px-6 pb-24">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
            <header className="text-center">
              <h1 className="text-5xl leading-tight font-extrabold tracking-tighter text-slate-950 md:text-6xl">
                {data.post.title}
              </h1>
            </header>

            <div className="blog-mdx-content flex w-full min-w-0 flex-col gap-6 text-center text-lg leading-relaxed text-slate-700 *:w-full [&>div]:flex [&>div]:min-h-0 [&>div]:w-full [&>div]:flex-col [&>div]:gap-6 **:data-tina-field:w-full **:data-tina-field:max-w-full">
              <TinaMarkdown components={components} content={data.post.body} />
            </div>
          </div>
        </article>

        <footer className="border-t border-slate-100 bg-slate-50 py-10">
          <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
            My Enterprise Architecture | Turborepo, Vercel, TinaCMS, Recurly
          </div>
        </footer>
      </div>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const filename = params?.filename;
  if (typeof filename !== "string" || !filename) {
    return { notFound: true };
  }

  const variables = { relativePath: relativePathFromRouteFilename(filename) };

  try {
    const res = await client.queries.post(variables);
    if (!res?.data?.post) {
      return { notFound: true };
    }
    return {
      props: {
        variables: res.variables,
        data: res.data,
        query: res.query,
      },
      revalidate: 60,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[blog getStaticProps]", err);
    }
    return { notFound: true };
  }
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection();
  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

export default BlogPage;

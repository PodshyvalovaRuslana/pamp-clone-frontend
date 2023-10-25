import Head from "next/head";
import { DrupalNode } from "next-drupal";
import { Layout } from "components/layout";
import { DrupalClient } from "next-drupal";
// to solve hydration problem dynamic imports for components are used
// https://github.com/vercel/next.js/discussions/35773#discussioncomment-2840696
// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading
import dynamic from "next/dynamic";
import { fakeHeroData, fakeVideoData } from "../fakeData";

const Media = dynamic(
  () => import("../components/Media").then((mod) => mod.Media),
  {
    ssr: false,
  }
);
const Hero = dynamic(
  () => import("../components/Hero").then((mod) => mod.Hero),
  {
    ssr: false,
  }
);

const drupal = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL);
interface IndexPageProps {
  articles: DrupalNode[];
}

export default function IndexPage({ articles }: IndexPageProps) {
  const wrapperStyle = {
    border: "2px solid gray",
  };

  return (
    <Layout>
      <div style={wrapperStyle}>
        <Hero
          title={fakeHeroData.title}
          imageUrl={fakeHeroData.imageUrl}
          imageMobileUrl={fakeHeroData.imageMobileUrl}
          content={fakeHeroData.content}
        />
        <div dangerouslySetInnerHTML={{ __html: articles[0].body.value }} />
        <Media
          title={fakeVideoData.title}
          videoUrl={fakeVideoData.videoUrl}
          posterUrl={fakeVideoData.posterUrl}
        />
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  // const node = await drupal.getResource(
  //   "node--article",
  //   "4a74e4f5-b129-49da-ae13-a64cd4327c88"
  // )

  const articles = await drupal.getResourceCollection("node--article");
  // console.log("articles", articles);
  // console.log(articles[0].field_image.resourceIdObjMeta.alt);

  return {
    props: {
      articles,
    },
  };
}

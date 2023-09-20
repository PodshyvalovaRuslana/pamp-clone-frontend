import Head from "next/head"
import { DrupalNode } from "next-drupal"
import { Layout } from "components/layout"
import { DrupalClient } from "next-drupal"

const drupal = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL)
interface IndexPageProps {
  node: DrupalNode
}

export default function IndexPage({ node }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>{node.title}</title>
        <meta
          name="description"
          content="training project"
        />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: node.body.value }} />
    </Layout>
  )
}
export async function getStaticProps() {
  const node = await drupal.getResource(
    "node--page",
    "d53e28f4-c900-4e50-acde-44227feb4c9a"
  )

  return {
    props: {
      node,
    },
  }
}

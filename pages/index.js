import Head from "next/head";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { homeQuery, indexQuery } from "../lib/queries";
import { getClient, overlayDrafts } from "../lib/sanity.server";

export default function Index({ allPosts, preview, home }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{home?.title}</title>
        </Head>
        <Container>
          <Intro title={home?.title} subtitle={home?.subtitle} mainImage={home?.mainImage}/>
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )} */}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));

  const home = await getClient(preview).fetch(
    homeQuery
  );

  console.log(home);

  return {
    props: { allPosts, preview, home },
  };
}

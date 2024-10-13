import Head from "next/head";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { homeQuery, indexQuery, notificationQuery } from "../lib/queries";
import { getClient, overlayDrafts } from "../lib/sanity.server";
import PostBody from "../components/post-body";
import CoverImage from "../components/cover-image";
import { urlForImage } from "../lib/sanity";
import Image from "next/image";

export default function Index({ allPosts, preview, home, notification }) {
  return (
    <>
      <Layout preview={preview} notification={notification}>
        <Head>
          <title>{home?.title}</title>
        </Head>
        <Container>
          <Intro
            title={home?.title}
            subtitle={home?.subtitle}
            mainImage={home?.mainImage}
          />
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              {home?.section1Title}
            </h3>
            <PostBody content={home?.section1Content} />
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              {home?.section2Title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:mb-12">
              <div>
                <PostBody content={home?.section2Content1} />
                <Image
                  width="300"
                  height="300"
                  layout="responsive"
                  src={urlForImage(home?.section2Image1).url()}
                />
              </div>
              <div>
                <PostBody content={home?.section2Content2} />
                <Image
                  width="300"
                  height="300"
                  layout="responsive"
                  src={urlForImage(home?.section2Image2).url()}
                />
              </div>
              <div>
                <PostBody content={home?.section2Content3} />
                <Image
                  width="300"
                  height="300"
                  layout="responsive"
                  src={urlForImage(home?.section2Image3).url()}
                />
              </div>
              {
                home?.section2Image4 && home?.section2Content4 
                ? 
                <div>
                  <PostBody content={home?.section2Content4} />
                  <Image
                    width="300"
                    height="300"
                    layout="responsive"
                    src={urlForImage(home?.section2Image4)?.url()}
                  /> 
              </div>
                : null 
              }
            </div>

            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              {home?.section3Title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-6 md:mb-12">
              <PostBody content={home?.section3Content} />
              <div className="mx-auto row-start-1 md:row-start-auto">
                <Image
                  width="400"
                  height="400"
                  className="inline-block"
                  src={urlForImage(home?.section3Image).url()}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">
                  {home?.section4Title}
                </h3>
                <PostBody content={home?.section4Content} />
              </div>
              <div>
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">
                  {home?.section5Title}
                </h3>
                <PostBody content={home?.section5Content} />
              </div>
            </div>
          </div>
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
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
  const home = await getClient(preview).fetch(homeQuery);
  const notification = await getClient(preview).fetch(notificationQuery);

  return {
    props: { allPosts, preview, home, notification },
  };
}

import Head from "next/head";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { homeQuery, indexQuery } from "../lib/queries";
import { getClient, overlayDrafts } from "../lib/sanity.server";
import PostBody from "../components/post-body";
import CoverImage from "../components/cover-image";
import { urlForImage } from '../lib/sanity'
import Image from 'next/image'



export default function Index({ allPosts, preview, home }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{home?.title}</title>
        </Head>
        <Container>
          <Intro
            title={home?.title}
            subtitle={home?.subtitle}
            mainImage={home?.mainImage}
          />
          <div className="max-w-5xl mx-auto">
            <h3 className="text-5xl">{home?.section1Title}</h3>
            <PostBody content={home?.section1Content} />
            <h3 className="text-5xl">{home?.section2Title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 md:mb-8">
              <div>
                <PostBody content={home?.section2Content1} />
                <Image width="300" height="300" layout="responsive" src={urlForImage(home?.section2Image1).url()} />

              </div>
              <div>
                <PostBody content={home?.section2Content2} />
                <Image width="300" height="300" layout="responsive" src={urlForImage(home?.section2Image2).url()} />
              </div>
              <div>
                <PostBody content={home?.section2Content3} />
                <Image width="300" height="300" layout="responsive" src={urlForImage(home?.section2Image3).url()} />

              </div>
            </div>

            <h3 className="text-5xl">{home?.section3Title}</h3>
            <PostBody content={home?.section3Content} />
            <CoverImage image={home?.section3Image} />
            <h3 className="text-5xl">{home?.section4Title}</h3>
            <PostBody content={home?.section4Content} />
            <h3 className="text-5xl">{home?.section5Title}</h3>
            <PostBody content={home?.section5Content} />
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

  return {
    props: { allPosts, preview, home },
  };
}

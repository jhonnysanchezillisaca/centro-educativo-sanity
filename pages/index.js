import Head from "next/head";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { homeQuery, indexQuery, notificationQuery } from "../lib/queries";
import { getClient, overlayDrafts } from "../lib/sanity.server";
import PostBody from "../components/post-body";
import { urlForImage } from "../lib/sanity";
import Image from "next/image";
import Link from "next/link";

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
            <h3 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight underline">
              {home?.section1Title}
            </h3>
            <PostBody content={home?.section1Content} />
            <h3 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mt-10 underline mb-4">
              {home?.section2Title}
            </h3>
            <div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 md:mb-12">
              {home?.section2Activities?.map((activity) => (
                <Link href={`/activitats/${activity.slug.current}`}>
                  <div className="flex flex-col justify-between py-4 cursor-pointer rounded-md hover:ring-2 hover:ring-offset-8 hover:ring-offset-white hover:ring-black">
                    <div className="mb-4">
                      <h3 className="text-3xl font-semibold mb-4" >{activity.title}</h3>
                      <h4 className="text-lg mb-6 font-semibold text-gray-800 leading-tight">{activity.subtitle}</h4>
                      <Image
                        width="300"
                        height="300"
                        layout="responsive"
                        src={urlForImage(activity?.coverImage).url()}
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <PostBody content={activity?.excerpt} />
                      <div className="mt-4 w-full text-lg justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                        <Link href={`/activitats/${activity.slug.current}`}>
                          Saber més
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <h3 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mt-10 underline">
              {home?.section3Title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-6 md:mb-12">
              <PostBody content={home?.section3Content} />
              <div className="mx-auto row-start-1 mt-6 md:mt-0 md:row-start-auto">
                <Image
                  width="400"
                  height="400"
                  className="inline-block"
                  src={urlForImage(home?.section3Image).url()}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-0">
              <div className="flex flex-col items-center">
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4 underline">
                  {home?.section4Title}
                </h3>
                <PostBody content={home?.section4Content} />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4 underline">
                  {home?.section5Title}
                </h3>
                <PostBody content={home?.section5Content} />
              </div>
            </div>
          </div>
          {allPosts.length > 0 && <MoreStories title={home.moreStoriesTitle} posts={allPosts} />}
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

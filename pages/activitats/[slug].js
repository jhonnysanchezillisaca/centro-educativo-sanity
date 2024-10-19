import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import CoverImage from '../../components/cover-image'
import { notificationQuery, activitiesQuery, activitiesSlugsQuery } from "../../lib/queries";
import { urlForImage, usePreviewSubscription } from "../../lib/sanity";
import {
    sanityClient,
    getClient,
    overlayDrafts,
} from "../../lib/sanity.server";
import Link from "next/link";

export default function Activities({ data = {}, preview }) {
    const router = useRouter();

    const slug = data?.activity?.slug;
    const {
        data: { activity, moreActivities, notification },
    } = usePreviewSubscription(activitiesQuery, {
        params: { slug },
        initialData: data,
        enabled: preview && slug,
    });

    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout preview={preview} notification={notification}>
            <Container>
                <Header title={data?.pageTitle?.title} />
                {router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <article>
                            <Head>
                                <title>{activity.title}</title>
                                {activity.coverImage && (
                                    <meta
                                        key="ogImage"
                                        property="og:image"
                                        content={urlForImage(activity.coverImage)
                                            .width(1200)
                                            .height(627)
                                            .fit("crop")
                                            .url()}
                                    />
                                )}
                            </Head>
                            <PostHeader
                                title={activity.title}
                                coverImage={activity.coverImage}
                            />
                            <div className="max-w-2xl mx-auto">
                                <PostBody content={activity.content} />
                            </div>
                        </article>
                        <SectionSeparator />
                        <div>
                            {moreActivities?.length > 0 &&
                                <section>
                                    <h3 className="mb-8 text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                                        Més activitats
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:col-gap-8 row-gap-20 md:row-gap-32 mb-32">
                                        {moreActivities.map(({ slug, title, coverImage, excerpt }) => (
                                            <div className="mb-8" key={slug}>
                                                <Link href={`/activitats/${slug}`}>
                                                    <div className="cursor-pointer hover:ring-2 hover:ring-offset-4 hover:ring-offset-white hover:ring-black rounded">
                                                        <CoverImage title={title} image={coverImage} />
                                                        <h3 className="mt-5 text-3xl mb-3 leading-snug">
                                                            <a className="hover:underline">{title}</a>
                                                        </h3>
                                                        <PostBody content={excerpt} />
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </section>}
                        </div>
                    </>
                )}
            </Container>
        </Layout>
    );
}

export async function getStaticProps({ params, preview = false }) {
    const { activity, moreActivities, pageTitle } = await getClient(preview).fetch(
        activitiesQuery,
        {
            slug: params.slug,
        }
    );

    const notification = await getClient(preview).fetch(notificationQuery)


    return {
        props: {
            preview,
            data: {
                activity,
                moreActivities,
                pageTitle,
                notification,
            },
        },
    };
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(activitiesSlugsQuery);
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    };
}

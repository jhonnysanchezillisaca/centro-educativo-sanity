import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`Web del Institut Bahá'í al sud de Sabadell`}
      />
      <meta property="og:image" content="https://www.bahaisabadell.org/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fdlz5307s%2Fproduction%2F3136643c4e49b6f77c2538d083e6aaa461af3634-1702x630.png%3Frect%3D221%2C0%2C1260%2C630%26w%3D2000%26h%3D1000%26fit%3Dmax%26auto%3Dformat&w=2048&q=90" key="ogImage" />
    </Head>
  )
}

const postFields = `
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  },
  "pageTitle": *[_type == "homePage"][0] {
    title
  }
}`

export const activitiesQuery = `
{
  "activity": *[_type == "activity" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "moreActivities": *[_type == "activity" && slug.current != $slug] [0...4] {
    content,
    ${postFields}
  },
  "pageTitle": *[_type == "homePage"][0] {
    title
  }
}`

export const notificationQuery = `
*[_type == "notification"][0] {
  content,
  url
}
`


export const homeQuery = `
*[_type == "homePage"][0] {
  title,
  subtitle,
  mainImage,
  section1Title,
  section1Content,
  section2Title,
  "section2Activities": section2Activities[]->{title, subtitle, slug, excerpt, coverImage},
  section3Title,
  section3Content,
  section3Image,
  section4Title,
  section4Content,
  section5Title,
  section5Content,
  moreStoriesTitle,
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const activitiesSlugsQuery = `
*[_type == "activity" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

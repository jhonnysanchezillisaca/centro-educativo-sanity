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
  section2Content1,
  section2Image1,
  section2Content2,
  section2Image2,
  section2Content3,
  section2Image3,
  section2Content4,
  section2Image4,
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

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

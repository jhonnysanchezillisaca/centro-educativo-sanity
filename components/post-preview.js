import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div className='cursor-pointer hover:ring-2 hover:ring-offset-4 hover:ring-offset-white hover:ring-black rounded my-4'>
      <Link href={`/posts/${slug}`}>
        <div>

          <div className="mb-5">
            <CoverImage slug={slug} title={title} image={coverImage} />
          </div>
          <h3 className="text-3xl mb-3 leading-snug">
            <a className="hover:underline">{title}</a>
          </h3>
          <div className="text-lg mb-4">
            {/* <Date dateString={date} /> */}
          </div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        </div>
      </Link>
    </div>
  )
}

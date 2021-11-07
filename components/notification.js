import Container from './container'
import cn from 'classnames'

export default function Notification({ content, url }) {
  return (
    <div
      className={cn('border-b', {
        'bg-accent-7 border-accent-7 text-white': !!content,
        'bg-accent-1 border-accent-2': !content,
      })}
    >
      {!!content &&
        <Container>
          <div className="py-2 text-center">
            <>
              <a
                href={url}
                target="_blank"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                {content}
              </a>
            </>
          </div>
        </Container>
      }
    </div>
  )
}

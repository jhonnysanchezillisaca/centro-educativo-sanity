import Alert from '../components/alert'
import Notification from '../components/notification'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ preview, notification, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <Notification content={notification?.content} url={notification?.url}  />
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  )
}

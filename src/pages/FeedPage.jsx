import { useFeedStore } from '../store/useFeedStore.js'
import PostCard from '../components/PostCard.jsx'
import Typewriter from '../components/Typewriter.jsx'
import './FeedPage.css'

export default function FeedPage() {
  const posts = useFeedStore((state) => state.posts)
  const users = useFeedStore((state) => state.users)

  return (
    <section>
      <div className="feed-intro">
        <h1 className="feed-title">
          <Typewriter
            phrases={[
              'Hi, I am Vikas Yadav',
              'Welcome to my feed page!',
              'This is my Frontend Engineering Task',
            ]}
          />
        </h1>
        <p className="feed-subtitle">
          {posts.length} pinned {posts.length === 1 ? 'note' : 'notes'} from the network
        </p>
      </div>

      {posts.map((post) => {
        const author = users.find((u) => u.id === post.authorId)
        return <PostCard key={post.id} post={post} author={author} />
      })}
    </section>
  )
}

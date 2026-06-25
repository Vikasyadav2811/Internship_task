import { useParams, Link, useNavigate } from 'react-router-dom'
import { useFeedStore } from '../store/useFeedStore.js'
import Avatar from '../components/Avatar.jsx'
import PostCard from '../components/PostCard.jsx'
import './UserProfilePage.css'

export default function UserProfilePage() {
  const { userId } = useParams()
  const navigate = useNavigate()

  const user = useFeedStore((state) => state.getUserById(userId))
  const userPosts = useFeedStore((state) => state.getPostsByAuthor(userId))

  if (!user) {
    return (
      <div className="not-found">
        <p>No one's pinned to the board under that name.</p>
        <Link to="/" className="back-link">← Back to the feed</Link>
      </div>
    )
  }

  return (
    <section>
      <button type="button" className="back-link back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="profile-card">
        <Avatar user={user} size={64} />
        <div>
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-bio">{user.bio}</p>
        </div>
      </div>

      <h2 className="profile-section-heading">
        Notes from {user.name.split(' ')[0]} ({userPosts.length})
      </h2>

      {userPosts.length === 0 ? (
        <p className="no-comments">Nothing pinned yet.</p>
      ) : (
        userPosts.map((post) => (
          <PostCard key={post.id} post={post} author={user} />
        ))
      )}
    </section>
  )
}

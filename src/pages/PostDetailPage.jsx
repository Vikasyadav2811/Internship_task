import { useParams, useNavigate, Link } from 'react-router-dom'
import { useFeedStore } from '../store/useFeedStore.js'
import Avatar from '../components/Avatar.jsx'
import LikeStamp from '../components/LikeStamp.jsx'
import Comment from '../components/Comment.jsx'
import './PostDetailPage.css'

export default function PostDetailPage() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const post = useFeedStore((state) => state.getPostById(postId))
  const users = useFeedStore((state) => state.users)

  if (!post) {
    return (
      <div className="not-found">
        <p>This note seems to have fallen off the board.</p>
        <Link to="/" className="back-link">← Back to the feed</Link>
      </div>
    )
  }

  const author = users.find((u) => u.id === post.authorId)

  return (
    <section>
      <button type="button" className="back-link back-button" onClick={() => navigate(-1)}>
        ← Back to the feed
      </button>

      <article className="post-detail">
        <div className="post-detail-head">
          <Avatar user={author} size={48} />
          <div>
            <Link to={`/user/${author.id}`} className="post-detail-author">
              {author.name}
            </Link>
            <p className="post-detail-tag">posted to the board</p>
          </div>
        </div>

        <p className="post-detail-content">{post.content}</p>

        <div className="post-detail-actions">
          <LikeStamp postId={post.id} likeCount={post.likeCount} size="lg" />
          <span className="post-detail-comment-count">
            {post.comments.length} {post.comments.length === 1 ? 'reply' : 'replies'}
          </span>
        </div>
      </article>

      <div className="comments-section">
        <h2 className="comments-heading">Replies pinned underneath</h2>
        {post.comments.length === 0 ? (
          <p className="no-comments">No replies yet — be the first to pin one.</p>
        ) : (
          post.comments.map((comment) => {
            const commentAuthor = users.find((u) => u.id === comment.authorId)
            return (
              <Comment key={comment.id} comment={comment} author={commentAuthor} />
            )
          })
        )}
      </div>
    </section>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import Avatar from './Avatar.jsx'
import LikeStamp from './LikeStamp.jsx'
import './PostCard.css'

export default function PostCard({ post, author }) {
  const navigate = useNavigate()
  const commentCount = post.comments.length

  return (
    <article
      className="post-card"
      style={{ '--card-accent': author?.avatarColor }}
      onClick={() => navigate(`/post/${post.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/post/${post.id}`)
      }}
    >
      <div className="post-card-head">
        <Avatar user={author} size={38} />
        <div className="post-card-meta">
          <Link
            to={`/user/${author.id}`}
            className="post-card-author"
            onClick={(e) => e.stopPropagation()}
          >
            {author.name}
          </Link>
          <span className="post-card-tag">posted to the Community board</span>
        </div>
      </div>

      <p className="post-card-content">{post.content}</p>

      <div className="post-card-footer">
        <LikeStamp postId={post.id} likeCount={post.likeCount} size="sm" />
        <span className="post-card-comments">
          {commentCount} {commentCount === 1 ? 'reply' : 'replies'}
        </span>
      </div>
    </article>
  )
}

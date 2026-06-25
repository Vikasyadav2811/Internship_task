import { Link } from 'react-router-dom'
import Avatar from './Avatar.jsx'
import './Comment.css'

export default function Comment({ comment, author }) {
  return (
    <div className="comment">
      <Avatar user={author} size={30} />
      <div className="comment-body">
        <Link to={`/user/${author.id}`} className="comment-author">
          {author.name}
        </Link>
        <p className="comment-text">{comment.text}</p>
      </div>
    </div>
  )
}

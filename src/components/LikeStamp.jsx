import { useFeedStore } from '../store/useFeedStore.js'
import './LikeStamp.css'

export default function LikeStamp({ postId, likeCount, size = 'md' }) {
  const toggleLike = useFeedStore((state) => state.toggleLike)
  const isLiked = useFeedStore((state) => state.likedPostIds.has(postId))

  function handleClick(e) {
    e.stopPropagation()
    e.preventDefault()
    toggleLike(postId)
  }

  return (
    <button
      type="button"
      className={`like-stamp like-stamp--${size} ${isLiked ? 'is-liked' : ''}`}
      onClick={handleClick}
      aria-pressed={isLiked}
      aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
    >
      <span className="like-stamp-mark" aria-hidden="true">
        ★
      </span>
      <span className="like-stamp-count">{likeCount}</span>
    </button>
  )
}

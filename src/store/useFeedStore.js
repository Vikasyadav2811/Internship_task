import { create } from 'zustand'
import rawData from '../data/feedData.json'

export const useFeedStore = create((set, get) => ({
  users: rawData.users,
  posts: rawData.posts,

  likedPostIds: new Set(),

  getUserById: (userId) => get().users.find((u) => u.id === userId),

  getPostById: (postId) => get().posts.find((p) => p.id === postId),

  getPostsByAuthor: (userId) =>
    get().posts.filter((p) => p.authorId === userId),

  toggleLike: (postId) => {
    const { likedPostIds, posts } = get()
    const alreadyLiked = likedPostIds.has(postId)

    const nextLikedIds = new Set(likedPostIds)
    if (alreadyLiked) {
      nextLikedIds.delete(postId)
    } else {
      nextLikedIds.add(postId)
    }

    const nextPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likeCount: alreadyLiked ? post.likeCount - 1 : post.likeCount + 1,
          }
        : post
    )

    set({ posts: nextPosts, likedPostIds: nextLikedIds })
  },
}))

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import FeedPage from './pages/FeedPage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'
import UserProfilePage from './pages/UserProfilePage.jsx'
import './App.css'

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="/user/:userId" element={<UserProfilePage />} />
        </Routes>
      </main>
    </div>
  )
}

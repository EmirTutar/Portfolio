import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Timeline from './pages/Timeline.jsx'
import Projects from './pages/Projects.jsx'
import Technologies from './pages/Technologies.jsx'
import Resume from './pages/Resume.jsx'
import Contact from './pages/Contact.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import ImpossibleList from './pages/ImpossibleList.jsx'

export default function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="app-shell">
      <Navbar />

      <main className={isHome ? 'site-main' : 'site-main container'}>
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/timeline"            element={<Timeline />} />
          <Route path="/projects"            element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/technologies"        element={<Technologies />} />
          <Route path="/resume"              element={<Resume />} />
          <Route path="/contact"             element={<Contact />} />
          <Route path="/blog"                element={<Blog />} />
          <Route path="/blog/:id"            element={<BlogPost />} />
          <Route path="/impossible-list"     element={<ImpossibleList />} />
          <Route path="*"                    element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

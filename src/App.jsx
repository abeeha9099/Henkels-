import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import { redirects } from './data/redirects'

// Inner pages load on demand so the homepage stays light.
const About = lazy(() => import('./pages/About'))
const PracticeAreas = lazy(() => import('./pages/PracticeAreas'))
const Attorneys = lazy(() => import('./pages/Attorneys'))
const AttorneyProfile = lazy(() => import('./pages/AttorneyProfile'))
const Blog = lazy(() => import('./pages/Blog'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Contact = lazy(() => import('./pages/Contact'))
const DynamicPage = lazy(() => import('./pages/DynamicPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="practice-areas" element={<PracticeAreas />} />
            <Route path="attorneys" element={<Attorneys />} />
            <Route path="attorneys/:slug" element={<AttorneyProfile />} />
            <Route path="blog" element={<Blog />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="contact" element={<Contact />} />
            {Object.entries(redirects).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            {/* Every other original URL: practice, service, city, team, legal pages and blog posts */}
            <Route path=":slug" element={<DynamicPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

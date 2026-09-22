import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';

// import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectAdminRoute from './components/ProtectAdminRoute';
import About from './pages/About';
import EducationTimeline from './components/EducationTimeline';
import Projects from './pages/Projects';
import TechSkills from './pages/TechSkills';
import Contact from './pages/Contact';
import PageNotFound from './components/PageNotFound'

function App() {
  const [count, setCount] = new useState(0);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={
            <main>
              <Home />
              <About />
              <EducationTimeline />
              <Projects />
              <TechSkills />
              <Contact />
            </main>

          }></Route>

          <Route path='/admin-login-form' element={<AdminLogin />}></Route>
          <Route path='/admin-dashboard' element={
            <ProtectAdminRoute>
              <AdminDashboard />
            </ProtectAdminRoute>
          }>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App

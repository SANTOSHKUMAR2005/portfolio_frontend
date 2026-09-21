import React from 'react'
import { FaGithub , FaLinkedinIn } from 'react-icons/fa'
import {useLocation , Link} from 'react-router'



const Footer = () => {
     
    const location=useLocation()

    const isAdminPage = location.pathname === "/admin-login-form" || location.pathname === "/admin-dashboard";

  return (
     <footer className='border-t border-white/10 bg-slate-950 px-5 py-10'>
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
                  <a href="/" className="font-mono text-lg font-bold text-white">
                      <span className="text-background-secondary">&lt;</span>
                      Santosh
                      <span className="text-background-secondary">/&gt;</span>
                  </a>
                  <p className="mt-2 text-sm text-slate-500">
                      Full-Stack Java Developer • NIT Patna
                  </p>
            </div>

            <div className="flex items-center gap-3">
                  <a
                      href="https://github.com/SANTOSHKUMAR2005"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="rounded-full border border-white/10 p-3 text-slate-400 transition hover:border-background-secondary hover:text-background-secondary"
                  >
                      <FaGithub />
                  </a>
                  <a
                      href="https://www.linkedin.com/in/santosh-kumar-25a6482b5/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="rounded-full border border-white/10 p-3 text-slate-400 transition hover:border-background-secondary hover:text-background-secondary"
                  >
                      <FaLinkedinIn />
                  </a>
                  <span className="mx-1 h-6 w-px bg-white/10" />
                  {
                    isAdminPage ? (
                      <Link to='/' className="text-xs font-semibold text-slate-400 hover:text-white">
                        Portfolio
                      </Link>
                    ):(
                              <Link to='/admin-login-form' className="text-xs font-semibold text-slate-500 hover:text-background-secondary">
                        Admin
                     </Link>
                    )
                  }
            </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/5 pt-5 text-center text-xs text-slate-600">
              © {new Date().getFullYear()} Santosh Kumar. Built with React, Tailwind CSS & Spring Boot.
        </div>
     </footer>
  )
}

export default Footer
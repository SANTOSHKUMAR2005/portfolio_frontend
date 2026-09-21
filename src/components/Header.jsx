import React from 'react'
import { useState, useEffect } from 'react'
import {Link , useLocation , useNavigate} from 'react-router'
import { useData } from '../context/ContextAPI';
import {toast} from 'react-toastify'
import {motion} from 'motion/react'
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { RiCloseLargeFill, RiMenu3Line } from "react-icons/ri";

const Header = () => {

      const links = [
          { label: 'Home', href: '#home' },
          { label: 'About', href: '#about' },
          { label: 'Projects', href: '#projects' },
          { label: 'Skills', href: '#skills' },
          { label: 'Contact', href: '#contact' }
      ]

  const location=useLocation();
  const navigate=useNavigate()
  // const [adminLogOut]=useData();

  const [scrolled, setScrolled] = useState(true);

  const [open , setOpen]=useState(false);
      useEffect(()=>{
        setOpen(false);
      },[location.pathname, location.hash]);

  const logout = () => {
        //  adminLogOut();
         toast.success("Logout successfully");
          navigate("/");
      };

  if(location.pathname === "/admin-login-form" || location.pathname === "/admin-dashboard"){
    return (
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-mono text-lg font-bold text-white">
            <span className="text-background-secondary">&lt;</span>
            Santosh
            <span className="text-background-secondary">/&gt;</span>
          </Link>

          {location.pathname === "/admin-dashboard" && (
            <button
              onClick={logout}
              className="rounded-full border border-red-400/30 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
            >
              Logout
            </button>
          )}

          {location.pathname === "/admin-login-form" && (
            <Link
              to="/"
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:border-background-secondary hover:text-background-secondary"
            >
              Back to portfolio
            </Link>
          )

         }
        </div>
      </header>
    );
  }


  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
        ? "border-b border-white/10 bg-slate-950/80 shadow-lg shadow-black/10 backdrop-blur-xl"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="font-mono text-lg font-bold tracking-tight text-white">
          <span className="text-background-secondary">&lt;</span>
          Santosh
          <span className="text-background-secondary">/&gt;</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className={`relative py-2 text-sm font-medium transition ${location.hash === link.href
                ? "text-background-secondary"
                : "text-slate-300 hover:text-white"
                }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-background-secondary transition-all ${location.hash === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </motion.a>
          ))}

          <a
            href="https://github.com/SANTOSHKUMAR2005"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-slate-300 transition hover:text-white"
          >
            <FaGithub size={19} />
          </a>

          <a
            href="https://www.linkedin.com/in/santosh-kumar-25a6482b5/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-300 transition hover:text-background-secondary"
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>

        <button
          className="rounded-lg border border-white/10 p-2 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <RiCloseLargeFill size={24} /> : <RiMenu3Line size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-5 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 text-slate-200 transition hover:bg-white/5 hover:text-background-secondary"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-3 border-t border-white/10 pt-4">
              <a
                href="https://github.com/SANTOSHKUMAR2005"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 p-3 text-white"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/santosh-kumar-25a6482b5/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 p-3 text-white"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
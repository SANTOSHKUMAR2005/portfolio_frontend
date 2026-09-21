import React from 'react'
import { motion } from 'motion/react'
import { FaArrowDown, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useState } from 'react';

import { useData } from '../context/ContextAPI'
import { toast } from 'react-toastify';

import portfolio_pic1 from '../assets/santosh.png'
import { Backend_BASE_URL } from '../api/apiConfig';

const Home = () => {

  const { resumeURL, setResumeURL, buildText, setBuildText } = useData();

  const getResumeURL = async () => {
    if (resumeURL == null) {
      try {
        const response = await fetch(`${Backend_BASE_URL}/get/resumeURL`);
        if (response.ok) {
          const data = await response.json();
          const url = data.resumeURL;
          setResumeURL(url);
        } else {
          console.log(response.message);
        }

      } catch (e) {
        console.log(e.message);
      }
    }
  }

  

  const getRunningText = async () => {
    try {
      const response = await fetch(`${Backend_BASE_URL}/get/runningText`);
      if (response.ok) {
        const data = await response.json();
        const allRunningText = data.RunningText;

        // console.log(allRunningText);

        setBuildText(allRunningText);
      } else {
        console.log(response.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    getResumeURL();
    // getRunningText();
  }, [])


  const [dynamicText, setDynamicText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

 
  useEffect(() => {
    const currentRole = buildText[index]['text'];

    let speed = isDeleting ? 80 : 150;

    if (isDeleting && dynamicText === currentRole) {
      speed = 1000; // 2-second pause after text is fully typed
    } else if (isDeleting && dynamicText === "") {
      speed = 700;  // Pause before typing the next sentence
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentRole.substring(0, dynamicText.length + 1);
        setDynamicText(nextText);

        if (nextText === currentRole) {
          setIsDeleting(true);
        }
      } else {
        const nextText = currentRole.substring(0, dynamicText.length - 1);
        setDynamicText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setIndex((previousIndex) => (previousIndex + 1) % buildText.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [dynamicText, isDeleting, index]);



  const downloadResume = async () => {
    if (resumeURL != null) {
      try {
        const response = await fetch(resumeURL);
        if (response.ok) {

          const blob = await response.blob();

          const blobURL = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobURL;
          link.setAttribute('download', 'Santosh_Kumar_Resume.pdf');

          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(blobURL);

        } else {
          toast.error("download faild");
          console.log(response);
        }

      } catch (error) {
        toast.error('Something went wrong!');
        console.log(error);
      }
    } else {
      toast.info(<span><b>Resume currently unavailable</b> <p>My resume is being updated. Please check back soon!</p></span>)
    }
  }



  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-background-primary bg-hero-gradient text-white">
      {/* background glow */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-background-secondary/20 blur-3xl animate-glow" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-background-tertiary/20 blur-3xl animate-glow" />

      {/* main container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          {/* left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="mb-3 text-lg text-gray-400">Hello, I'm</p>

            <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Santosh
              <span className="block bg-linear-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Kumar.
              </span>
            </h1>

            {/* Typewriter */}
            <div className="mt-6 flex min-h-25 items-start text-2xl font-medium sm:text-3xl">
              <span className="mr-2 whitespace-nowrap text-gray-400" >I build</span>

              <span className="text-violet-400">
                {dynamicText}
                <span className="ml-1 inline-block h-7 w-0.5 animate-pulse bg-cyan-400 align-middle sm:h-8" />
              </span>
            </div>
            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              A passionate Full-Stack Developer specializing in Java,
              Spring Boot and React. I enjoy building secure, scalable
              applications and solving complex problems through clean
              and efficient code.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-xl bg-linear-to-r from-violet-600 to-purple-500 px-6 py-3 font-semibold shadow-lg shadow-violet-500/20 transition"
              >
                View My Work
              </motion.a>

              <motion.a
                // href={resumeURL}
                // download='sk.pdf'
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/10"
                onClick={() => downloadResume()}
              >
                Download Resume
              </motion.a>
            </div>

            {/* Social links */}
            <div className="mt-8 flex gap-3">
              <a
                href="https://github.com/SANTOSHKUMAR2005"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-violet-400 hover:text-violet-400"
              >
                <FaGithub size={19} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>


          </motion.div>

          {/* right content */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative flex flex-col items-center lg:items-end"
          >

            {/* Open to opportunities */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-300 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <span>Open to opportunities</span>
            </div>

            {/* Photo area */}
            <div className="relative flex justify-center">
              <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

              <img
                src={portfolio_pic1}
                alt="Santosh Kumar"
                className="relative z-10  rounded-br-3xl h-95 w-95 shadow-[0_12px_10px_-10px_rgba(76,29,149,0.3)] sm:h-117.5 sm:w-117.5"
              />
            </div>

            {/* Focus badge */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center backdrop-blur-md">
              <p className="text-xs text-gray-400">
                Currently focused on
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Java • Spring Boot • React • AI/ML • Generative AI
              </p>
            </div>

          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-500 md:flex"
        >
          <span className="text-xs">
            Scroll to explore
          </span>
          <FaArrowDown className='animate-bounce' />
        </motion.div>
      </div>
    </section>
  )
}

export default Home
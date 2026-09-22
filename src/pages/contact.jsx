import React, { useState } from "react";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { FaArrowRight, FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Backend_BASE_URL } from "../api/apiConfig";
import Spin from "../components/Spin";

const Contact = () => {
  const [isloading, setIsloading] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", message: "" });

  const inputHandler = (e) =>
    setUser((current) => ({ ...current, [e.target.name]: e.target.value }));

  const contactformHandler = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const response = await fetch(`${Backend_BASE_URL}/api/contact-form/save-message`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Message sent successfully");
        setUser({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Unable to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to send your message. Please try again.");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <section id="contact" className="section-shell">
      <div className="section-heading">
        <p>Have an idea?</p>
        <h2>
          Let&apos;s <span>Connect</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/2.5 p-7"
        >
          <span className="inline-flex rounded-full border border-background-secondary/20 bg-background-secondary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-background-secondary">
            Available for opportunities
          </span>

          <h3 className="mt-5 text-2xl font-bold text-white">
            Let&apos;s build something useful.
          </h3>

          <p className="mt-4 leading-7 text-slate-400">
            Whether it&apos;s a job opportunity, collaboration, project idea or
            simply a technical conversation, feel free to reach out.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="mailto:sank224203@gmail.com"
              className="flex items-center gap-4 rounded-2xl border border-white/10 p-4 transition hover:border-background-secondary/30"
            >
              <MdEmail className="text-2xl text-background-secondary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Email</p>
                <p className="mt-1 text-sm text-slate-200">sank224203@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+919506279760"
              className="flex items-center gap-4 rounded-2xl border border-white/10 p-4 transition hover:border-background-secondary/30"
            >
              <FaPhone className="text-xl text-background-secondary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Phone</p>
                <p className="mt-1 text-sm text-slate-200">+91 95062 79760</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 p-4">
              <FaLocationDot className="text-xl text-background-secondary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Based in</p>
                <p className="mt-1 text-sm text-slate-200">Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex gap-3">
            <a
              href="https://github.com/SANTOSHKUMAR2005"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 p-3 text-slate-300 hover:border-background-secondary hover:text-background-secondary"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/santosh-kumar-25a6482b5/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 p-3 text-slate-300 hover:border-background-secondary hover:text-background-secondary"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={contactformHandler}
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/2.5 p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Name
              </span>
              <input
                name="name"
                value={user.name}
                onChange={inputHandler}
                required
                autoComplete="name"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-background-secondary/50"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </span>
              <input
                name="email"
                type="email"
                value={user.email}
                onChange={inputHandler}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-background-secondary/50"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Message
            </span>
            <textarea
              name="message"
              value={user.message}
              onChange={inputHandler}
              required
              maxLength={500}
              rows={7}
              className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-background-secondary/50"
              placeholder="Tell me a little about your opportunity or idea..."
            />
            <span className="mt-1 block text-right text-xs text-slate-600">
              {user.message.length}/500
            </span>
          </label>

          <button
            disabled={isloading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-background-secondary py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isloading ? <Spin /> : <>Send Message <FaArrowRight /></>}
          </button>
        </motion.form>
      </div>

      <a
        href="#home"
        aria-label="Back to top"
        className="fixed bottom-6 right-5 z-40 rounded-full border border-white/10 bg-slate-900/90 p-3 text-background-secondary shadow-xl backdrop-blur transition hover:-translate-y-1"
      >
        ↑
      </a>
    </section>
  );
};

export default Contact;

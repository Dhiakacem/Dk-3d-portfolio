import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { avatar, menu, close } from "../assets";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageSegment from "./LanguageSegment";

const NavItem = ({ nav, active, onClick }) => {
  const { t } = useTranslation();
  return (
    <li
      className={`${
        active === nav.id ? "text-white" : "text-secondary"
      } hover:text-white text-[16px] font-medium cursor-pointer transition-colors duration-200`}
      onClick={() => onClick(nav.id)}
    >
      <a href={`#${nav.id}`}>{t(nav.title)}</a>
    </li>
  );
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${
        styles.paddingX
      } w-full flex items-center py-4 fixed top-0 z-50 transition-colors duration-300 ease-out ${
        scrolled
          ? "bg-primary/95 dark:bg-primary-dark/95 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={avatar} alt="logo" className="w-9 h-9 rounded-full object-cover" />
          <p className="text-white text-[18px] font-semibold cursor-pointer tracking-tight">
            {t("profile.name")}
          </p>
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          <ul className="list-none flex flex-row gap-8">
            {navLinks.map((nav) => (
              <NavItem
                key={nav.id}
                nav={nav}
                active={active}
                onClick={(id) => setActive(id)}
              />
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <LanguageSegment />
            <ThemeToggle />
          </div>
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-md bg-black/40 dark:bg-black/30 border border-white/5"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <img
              src={open ? close : menu}
              alt="menu"
              className="w-4 h-4 object-contain"
            />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="sm:hidden absolute top-16 inset-x-4 rounded-2xl bg-primary dark:bg-primary-dark border border-white/10 shadow-2xl mobile-menu-backdrop"
            >
              <div className="p-5 space-y-4">
                <ul className="list-none flex flex-col gap-3">
                  {navLinks.map((nav) => (
                    <li key={nav.id}>
                      <button
                        className={`w-full text-left text-[15px] font-medium py-2 rounded-md px-2 transition-colors duration-200 ${
                          active === nav.id
                            ? "text-white bg-white/5"
                            : "text-secondary hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => {
                          setActive(nav.id);
                          setOpen(false);
                          const el = document.querySelector(`#${nav.id}`);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                      >
                        {t(nav.title)}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-white/10 space-y-3">
                  <LanguageSegment
                    className="w-full justify-between"
                    onAfterChange={() => setOpen(false)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
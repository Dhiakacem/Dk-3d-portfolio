import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { cv, profile } from "../constants";
import { useTranslation } from "react-i18next";

const IconLink = ({ href, label, children }) => {
  const isMail = href && href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      aria-label={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-tertiary dark:bg-tertiary-dark hover:bg-[#151517] transition-colors duration-300 border border-white/5"
    >
      {children}
    </a>
  );
};

// Add card animation variants (entrance + hover)
const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    y: -6,
    scale: 1.02,
    boxShadow: "0 18px 50px rgba(145,94,255,0.18)",
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

const CV = () => {
  const [lang, setLang] = useState("en");
  const { t } = useTranslation();

  const filename = lang === "en" ? "CV_DhiaKacem_En.pdf" : "CV_DhiaKacem_Fr.pdf";
  const fileUrl = lang === "en" ? cv.en : cv.fr;

  const download = async () => {
    if (!fileUrl) return;
    try {
      const res = await fetch(fileUrl, { cache: "no-store" });
      if (!res.ok) throw new Error("Network response was not ok");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // fallback: open file directly
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="cv" className="w-full py-12">
      <motion.div variants={textVariant()} className="mb-6 text-center">
        <p className={styles.sectionSubText}>{t('cv.subtitle')}</p>
        <h2 className={styles.sectionHeadText}>{t('cv.title')}</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="max-w-3xl mx-auto px-4"
      >
        {/* Card styled like Experience cards, centered content */}
        <motion.div
          // replaced static div with animated motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          whileHover="hover"
          viewport={{ once: true, amount: 0.35 }}
          className="bg-tertiary dark:bg-tertiary-dark rounded-xl p-8 sm:p-10 lg:p-12 text-center shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm mx-auto border border-white/5"
          style={{
            boxShadow: "0 8px 42px rgba(145, 94, 255, 0.18)",
            border: "1px solid rgba(145, 94, 255, 0.18)",
          }}
        >
          {/* Short centered description */}
          <p className="text-secondary text-sm mb-6">
            {t('cv.choose')}
          </p>

          {/* Language toggle (centered) with subtle motion */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center bg-[#121116] rounded-lg p-1 gap-1 mb-6 mx-auto"
          >
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                lang === "en"
                  ? "bg-gradient-to-r from-[#5b8cff] to-[#7b5eff] text-white"
                  : "text-gray-300"
              }`}
              aria-pressed={lang === "en"}
            >
              {t('cv.english')}
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                lang === "fr"
                  ? "bg-gradient-to-r from-[#5b8cff] to-[#7b5eff] text-white"
                  : "text-gray-300"
              }`}
              aria-pressed={lang === "fr"}
            >
              {t('cv.french')}
            </button>
          </motion.div>

          {/* Download CTA centered (increased spacing) */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <button
              onClick={download}
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#915EFF] hover:bg-[#7b3be0] text-white rounded-md text-sm font-medium shadow-sm"
            >
              {/* ...existing svg... */}
              {t('cv.download')} — {lang === "en" ? "EN" : "FR"}
            </button>

            {/* Filename under the button */}
            <div className="text-center">
              <p className="text-secondary text-xs mb-0">{t('cv.file')}</p>
              <p className="text-white text-sm font-medium">{filename}</p>
            </div>
          </div>

          {/* Divider + icons centered */}
          <div className="pt-4 border-t border-white/6 flex items-center justify-center gap-4">
            <IconLink href={profile.github} label="GitHub">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 .5C5.73.5.98 5.25.98 11.52c0 4.66 3.03 8.62 7.24 10.02.53.1.72-.23.72-.51 0-.25-.01-.92-.01-1.8-2.95.64-3.57-1.27-3.57-1.27-.48-1.23-1.17-1.56-1.17-1.56-.96-.66.07-.65.07-.65 1.06.08 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.09-.7.37-1.15.67-1.41-2.36-.27-4.84-1.18-4.84-5.25 0-1.16.41-2.1 1.09-2.84-.11-.27-.47-1.36.1-2.83 0 0 .89-.29 2.92 1.08A10.2 10.2 0 0112 6.8c.9.004 1.81.12 2.66.35 2.03-1.37 2.92-1.08 2.92-1.08.57 1.47.21 2.56.1 2.83.68.74 1.09 1.68 1.09 2.84 0 4.08-2.49 4.98-4.86 5.25.38.33.72.98.72 1.98 0 1.43-.01 2.59-.01 2.94 0 .28.19.62.73.51 4.2-1.4 7.22-5.36 7.22-10.01C23.02 5.25 18.27.5 12 .5z" />
              </svg>
            </IconLink>

            <IconLink href={profile.linkedin} label="LinkedIn">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.97 0-1.75-.79-1.75-1.75S5.53 4.2 6.5 4.2 8.25 4.99 8.25 5.95 6.97 7.7 6.5 7.7zM20 19h-3v-5.5c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92V19h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V19z" />
              </svg>
            </IconLink>

            <IconLink href={`mailto:${profile.email}`} label="Email">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 13.065L.75 4.5v15A2.5 2.5 0 003.25 22h17.5a2.5 2.5 0 002.5-2.5v-15L12 13.065zM12 10L22.5 3H1.5L12 10z" />
              </svg>
            </IconLink>
          </div>

          <p className="text-secondary text-xs mt-3 mb-0">
            {t('cv.fallback')}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SectionWrapper(CV, "cv");

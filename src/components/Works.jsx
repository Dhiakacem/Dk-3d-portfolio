import React, { useRef } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, education, certifications } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useTranslation } from "react-i18next";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  showGithub = true,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.25, 0.65)}>
      <Tilt
        options={{
          max: 20,
          scale: 1,
          speed: 400,
        }}
        className="bg-primary-light/70 dark:bg-primary-dark/70 border border-white/5 p-5 rounded-2xl w-full h-full shadow-xl transition-colors duration-300 ease-out"
      >
        <div className="relative w-full h-[230px] overflow-hidden rounded-xl">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover"
          />

          {showGithub && (
            <div className="absolute inset-0 flex justify-end m-3">
              <button
                type="button"
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center border border-white/10 backdrop-blur-lg hover:scale-105 transition-transform"
                aria-label={t("works.view_code")}
              >
                <img
                  src={github}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </button>
            </div>
          )}
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[22px] leading-tight">{t(name)}</h3>
          <p className="mt-2 text-secondary text-[14px] leading-relaxed">{t(description)}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[13px] tracking-wide ${tag.color}`}
            >
              #{t(tag.name)}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { t } = useTranslation();
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const offset = direction === "left" ? -360 : 360;
    sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div id="projects">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>{t('works.subtitle')}</p>
        <h2 className={`${styles.sectionHeadText}`}>{t('works.title')}</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          {t('works.description')}
        </motion.p>
      </div>

      {/* Projects Snap Slider */}
      <div className="mt-16 flex items-center gap-4">
        <button
          type="button"
          aria-label={t("works.prev_projects")}
          className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-primary-light/70 dark:bg-primary-dark/70 shadow-lg hover:border-white/40 transition-colors duration-300"
          onClick={() => scrollSlider("left")}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 no-scrollbar flex-1 scroll-smooth"
        >
          {projects.map((project, index) => (
            <div
              key={`project-${project.name}-${index}`}
              className="snap-center flex-shrink-0 w-[85vw] xs:w-[320px] sm:w-[360px]  md:w-1/3  "
            >
              <ProjectCard index={index} {...project} showGithub={project.showGithub !== false} />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label={t("works.next_projects")}
          className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-primary-light/70 dark:bg-primary-dark/70 shadow-lg hover:border-white/40 transition-colors duration-300"
          onClick={() => scrollSlider("right")}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Certifications & Education */}
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 1)}
        className="mt-14 max-w-6xl mx-auto px-4 sm:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Education */}
          <div className="bg-primary-light/70 dark:bg-primary-dark/70 border border-white/5 rounded-2xl p-6 shadow-lg transition-colors duration-300">
            <h3 className="text-white text-xl font-bold mb-4">{t("works.education_title")}</h3>
            <div className="space-y-4">
              {education.map((ed, i) => (
                <motion.div
                  key={`edu-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="p-4 bg-black-100/60 dark:bg-black-200/60 rounded-lg border border-white/10"
                >
                  <p className="text-white font-semibold">{t(ed.school)}</p>
                  <p className="text-secondary text-sm mt-1">{t(ed.degree)}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-secondary">
                    <span>{ed.date}</span>
                    <span>{t(ed.location)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Certifications */}
          <div className="bg-primary-light/70 dark:bg-primary-dark/70 border border-white/5 rounded-2xl p-6 shadow-lg transition-colors duration-300">
            <h3 className="text-white text-xl font-bold mb-4">{t("works.certifications_title")}</h3>
            <div className="flex flex-col gap-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={`cert-${i}`}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between gap-4 p-3 rounded-md bg-black-100/60 dark:bg-black-200/60 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{cert.icon}</div>
                    <div>
                      <p className="text-white font-medium">{t(cert.name)}</p>
                      <p className="text-secondary text-xs mt-1">{cert.issued}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Works, "");
import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { useTranslation } from "react-i18next";

const ExperienceCard = ({ experience, index, isLeft }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={fadeIn(isLeft ? "right" : "left", "spring", index * 0.3, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full mb-6 sm:mb-10 md:mb-16 px-4 sm:px-0 relative`}
    >
      {/* Timeline Dot - Alternating sides */}
      <motion.div
        className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 ${
          isLeft ? "left-1/2 -translate-x-8" : "left-1/2 translate-x-8"
        }`}
        initial={{ scale: 0, opacity: 0, x: isLeft ? -20 : 20 }}
        whileInView={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
        viewport={{ once: true }}
      >
        <motion.div
          className="
            w-5 h-5 
            rounded-full 
            bg-gradient-to-br from-[#915EFF] to-[#6d28d9] 
            border-2 border-[#1f1f1f]
            shadow-lg shadow-[#915EFF]/50
            backdrop-blur-md
            relative
            cursor-pointer
            group
          "
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        >
          {/* Inner shine */}
          <div className="
            absolute top-1 left-1 
            w-1.5 h-1.5 
            rounded-full 
            bg-white/40 
            blur-[0.5px]
          " />
          
          {/* Pulsing glow */}
          <motion.span 
            className="
              absolute inset-0 
              w-full h-full 
              rounded-full 
              bg-[#915EFF]
            "
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Hover tooltip on opposite side of card */}
          <div className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs text-white px-2 py-1 rounded ${
            isLeft ? "left-6 ml-2" : "right-6 mr-2"
          } bg-tertiary dark:bg-tertiary-dark backdrop-blur-sm border border-[#915EFF]/30 shadow-lg`}>
            {experience.company_name}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className={`w-full sm:w-11/12 md:w-5/12 ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
        whileHover={{ scale: 1.02, y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <div
          className='bg-tertiary dark:bg-tertiary-dark rounded-xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/5'
          style={{
            boxShadow: "0 8px 32px rgba(145, 94, 255, 0.2)",
            border: "1px solid rgba(145, 94, 255, 0.3)",
          }}
        >
          {/* Header with icon and company */}
          <div className='flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4'>
            <motion.div
              className='w-14 h-14 sm:w-16 sm:h-16 rounded-full flex-shrink-0 flex items-center justify-center'
              style={{ background: experience.iconBg, boxShadow: "0 0 24px rgba(145, 94, 255, 0.4)" }}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 10, duration: 0.4 }}
            >
              <img
                src={experience.icon}
                alt={experience.company_name}
                className='w-8 h-8 sm:w-10 sm:h-10 object-contain'
              />
            </motion.div>
            <div className='flex-1 min-w-0'>
              <h3 className='text-white text-lg sm:text-xl md:text-2xl font-bold break-words'>
                {t(experience.title)}
              </h3>
              <p className='text-secondary text-xs sm:text-sm md:text-base font-semibold mt-1'>
                {experience.company_name}
              </p>
            </div>
          </div>

          {/* Date with icon */}
          <motion.div
            className='mb-4 pb-4 border-b border-secondary/30'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className='text-secondary text-xs sm:text-sm font-semibold flex items-center gap-2'>
              <span className='text-lg'>📅</span>
              {experience.date}
            </p>
          </motion.div>

          {/* Points */}
          <ul className='space-y-2 sm:space-y-3 mb-5 sm:mb-6'>
            {experience.points.map((point, idx) => (
              <motion.li
                key={`experience-point-${idx}`}
                className='text-white-100 text-xs sm:text-sm md:text-base pl-3 sm:pl-4 border-l-2 border-secondary/50 leading-relaxed'
                initial={{ opacity: 0, x: isLeft ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                {t(point)}
              </motion.li>
            ))}
          </ul>

          {/* Technologies */}
          {experience.technologies && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className='text-secondary text-xs sm:text-sm font-semibold mb-2 sm:mb-3 uppercase tracking-widest'>
                {t('experience.tech_stack')}
              </p>
              <div className='flex flex-wrap gap-1.5 sm:gap-2'>
                {experience.technologies.map((tech, idx) => (
                  <motion.span
                    key={`tech-${idx}`}
                    className='bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-xs font-medium hover:text-white transition-colors duration-200'
                    whileHover={{ scale: 1.12, backgroundColor: "#915EFF" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {t(tech)}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const { t } = useTranslation();

  return (
    <div id="experience">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center text-xs sm:text-base`}>
          {t('experience.subtitle')}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center text-2xl sm:text-4xl md:text-5xl`}>
          {t('experience.title')}
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed sm:leading-8 text-center mx-auto px-4'
      >
        {t('experience.description')}
      </motion.p>

      {/* Timeline container */}
      <div className='mt-12 sm:mt-16 md:mt-20 flex flex-col relative w-full'>
        {/* Enhanced Vertical Timeline Line */}
        <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#915EFF] via-[#915EFF]/30 to-transparent' />

        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>

      {/* Summary stats */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 1)}
        className='mt-16 sm:mt-20 md:mt-24 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 px-4'
      >
        <motion.div
        className='bg-tertiary dark:bg-tertiary-dark rounded-lg p-4 sm:p-6 text-center transition-colors duration-300 border border-white/5'
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#915EFF]'>2+</p>
          <p className='text-secondary text-xs sm:text-sm mt-2'>{t('stats.years_experience')}</p>
        </motion.div>
        <motion.div
        className='bg-tertiary dark:bg-tertiary-dark rounded-lg p-4 sm:p-6 text-center transition-colors duration-300 border border-white/5'
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        >
          <p className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#915EFF]'>4</p>
          <p className='text-secondary text-xs sm:text-sm mt-2'>{t('stats.companies')}</p>
        </motion.div>
        <motion.div
        className='bg-tertiary dark:bg-tertiary-dark rounded-lg p-4 sm:p-6 text-center transition-colors duration-300 border border-white/5'
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          <p className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#915EFF]'>10+</p>
          <p className='text-secondary text-xs sm:text-sm mt-2'>{t('stats.technologies')}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
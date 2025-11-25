import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Get current date/time for the template
    const now = new Date().toLocaleString();

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          // Match these keys to your EmailJS template variable names
          name: form.name,
          email: form.email,
          message: form.message,
          time: now,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert(t('contact.success'));

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS Error:", error);

          alert(t('contact.error'));
        }
      );
  };

  return (
    <div
      className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden transition-colors duration-300"
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-primary-light/80 dark:bg-primary-dark/80 p-8 rounded-2xl border border-white/5 shadow-xl transition-colors duration-300'
      >
        <p className={styles.sectionSubText}>{t('contact.get_in_touch')}</p>
        <h3 className={styles.sectionHeadText}>{t('contact.title')}</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>{t('contact.name_label')}</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder={t('contact.name_placeholder')}
              className='bg-tertiary dark:bg-tertiary-dark py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 font-medium transition-colors duration-300'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>{t('contact.email_label')}</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder={t('contact.email_placeholder')}
              className='bg-tertiary dark:bg-tertiary-dark py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 font-medium transition-colors duration-300'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>{t('contact.message_label')}</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder={t('contact.message_placeholder')}
              className='bg-tertiary dark:bg-tertiary-dark py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 font-medium transition-colors duration-300'
            />
          </label>

          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-tertiary dark:bg-tertiary-dark py-3 px-8 rounded-xl outline-none text-white font-bold shadow-md shadow-primary hover:bg-[#2d1b4e] transition-colors duration-300'
            >
              {loading ? t('contact.sending') : t('contact.send')}
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import DeferredScene from "./DeferredScene";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useTranslation } from "react-i18next";

const emailServiceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (emailPublicKey) emailjs.init(emailPublicKey);
  }, []);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm((current) => ({ ...current, [name]: value }));
    setSubmissionStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus(null);

    try {
      if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
        throw new Error("Contact form email service is not configured.");
      }

      await emailjs.send(
        emailServiceId,
        emailTemplateId,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          time: new Date().toLocaleString(),
        },
        emailPublicKey
      );
      setSubmissionStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
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
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>{t('contact.name_label')}</span>
            <input
              type='text'
              name='name'
              autoComplete='name'
              maxLength={100}
              required
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
              autoComplete='email'
              maxLength={254}
              required
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
              maxLength={5000}
              required
              value={form.message}
              onChange={handleChange}
              placeholder={t('contact.message_placeholder')}
              className='bg-tertiary dark:bg-tertiary-dark py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 font-medium transition-colors duration-300'
            />
          </label>

          {submissionStatus && (
            <p
              role={submissionStatus === "error" ? "alert" : "status"}
              aria-live={submissionStatus === "error" ? "assertive" : "polite"}
              className={`-mt-4 rounded-lg border px-4 py-3 text-sm ${submissionStatus === "success" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-rose-400/30 bg-rose-400/10 text-rose-200"}`}
            >
              {t(`contact.${submissionStatus}`)}
            </p>
          )}

          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={loading}
              aria-busy={loading}
              className='bg-tertiary dark:bg-tertiary-dark py-3 px-8 rounded-xl outline-none text-white font-bold shadow-md shadow-primary hover:bg-[#2d1b4e] transition-colors duration-300 disabled:cursor-wait disabled:opacity-60'
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
        <DeferredScene kind="earth" />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

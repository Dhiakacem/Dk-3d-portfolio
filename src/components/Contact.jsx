import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();
  const { t } = useTranslation();

  useEffect(() => {
    if (!submissionStatus) return undefined;
    const timeout = window.setTimeout(() => setSubmissionStatus(null), 6500);
    return () => window.clearTimeout(timeout);
  }, [submissionStatus]);

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

      <AnimatePresence>
        {submissionStatus && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: "easeOut" }}
            role={submissionStatus === "error" ? "alert" : "status"}
            aria-live={submissionStatus === "error" ? "assertive" : "polite"}
            className={`fixed inset-x-4 bottom-4 z-[1100] flex items-start gap-3 rounded-2xl border bg-white p-4 text-slate-900 shadow-[0_16px_50px_rgba(15,23,42,0.22)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[min(26rem,calc(100vw-3rem))] dark:bg-[#10162b] dark:text-white ${submissionStatus === "success" ? "border-emerald-200 dark:border-emerald-400/30" : "border-rose-200 dark:border-rose-400/30"}`}
          >
            <span className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${submissionStatus === "success" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300" : "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300"}`} aria-hidden="true">
              {submissionStatus === "success" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path d="m5 12 4 4L19 6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path d="M12 8v4m0 4h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{t(`contact.${submissionStatus}_title`)}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{t(`contact.${submissionStatus}`)}</p>
            </div>
            <button
              type="button"
              onClick={() => setSubmissionStatus(null)}
              aria-label={t("contact.dismiss_notification")}
              className="-mr-1 -mt-1 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4"><path d="m6 6 12 12M18 6 6 18" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

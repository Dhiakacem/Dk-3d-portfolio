
import { styles } from "../styles";
import DeferredScene from "./DeferredScene";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-x-0 top-[120px] z-10 pointer-events-none max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className={`${styles.heroHeadText} text-white break-words`}>
            {t('hero.greeting')}{" "}
            <span className='text-[#915EFF]'>{t('profile.name')}</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 break-words`}>
            <span className="block">{t('hero.subtitle')}</span>
            <span className="mt-2 block">{t('hero.subtitle2')}</span>
          </p>
        </div>
      </div>

      <DeferredScene kind="computer" />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about' aria-label={t('nav.about')}>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <div
              className='w-3 h-3 rounded-full bg-secondary mb-1 animate-bounce'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;

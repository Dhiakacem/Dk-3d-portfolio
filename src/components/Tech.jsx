import React from "react";
import { useTranslation } from "react-i18next";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center'>
      {/* optional small subtitle above icons */}
      <p className='text-secondary text-sm mb-4'>{t('tech.subtitle')}</p>

      <div className='flex flex-row flex-wrap justify-center gap-10'>
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");

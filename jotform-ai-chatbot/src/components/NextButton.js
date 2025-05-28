import React from 'react';

import { saveInstallment } from '../api';
import IconArrowRight from '../assets/svg/IconArrowRight.svg';
import { ALL_TEXTS, STEPS } from '../constants';
import { useWizard } from '../hooks';
import { ACTION_CREATORS } from '../store';
import { t, toCamelCase } from '../utils';
import Button from './UI/Button';

const NextButton = () => {
  const { state, dispatch } = useWizard();

  const { step } = state;

  const handleNextClick = async () => {
    dispatch(ACTION_CREATORS.nextStep());
    saveInstallment(`nextButton_${toCamelCase(step)}Step`);
  };

  return (
    <>
      {![STEPS.INITIAL, STEPS.USECASE_SELECTION, STEPS.SHARE, STEPS.WP_PAGE_SELECTION, STEPS.KNOWLEDGE].includes(step) && (
        <Button
          endIcon={<IconArrowRight />}
          onClick={handleNextClick}
          className={`buttonRTL ${step === STEPS.CUSTOMIZATION && 'btn-pos-right'}`}
          data-fs-element={`Step: ${step} - ${ALL_TEXTS.NEXT} Button`}
        >
          {t(ALL_TEXTS.NEXT)}
        </Button>
      )}
    </>
  );
};

export default NextButton;

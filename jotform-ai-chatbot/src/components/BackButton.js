import React from 'react';

import { saveInstallment } from '../api';
import IconArrowLeft from '../assets/svg/IconArrowLeft.svg';
import { ALL_TEXTS, STEPS } from '../constants';
import { useWizard } from '../hooks';
import { ACTION_CREATORS } from '../store';
import { t, toCamelCase } from '../utils';
import Button from './UI/Button';

const BackButton = () => {
  const { state, dispatch } = useWizard();
  const { step } = state;

  const handleBackClick = () => {
    dispatch(ACTION_CREATORS.previousStep());
    saveInstallment(`backButton_${toCamelCase(step)}Step`);
  };

  return (
    <>
      {![STEPS.INITIAL, STEPS.USECASE_SELECTION, STEPS.CUSTOMIZATION, STEPS.WP_PAGE_SELECTION].includes(step) && (
      <Button
        startIcon={<IconArrowLeft />}
        onClick={handleBackClick}
        variant='ghost'
        colorStyle='secondary'
        className='buttonRTL'
        data-fs-element={`Step: ${step} - ${ALL_TEXTS.BACK} Button`}
      >
        {t(ALL_TEXTS.BACK)}
      </Button>
      )}
    </>
  );
};

export default BackButton;

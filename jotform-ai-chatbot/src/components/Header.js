import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import { createPortal } from 'react-dom';

import { saveInstallment } from '../api';
import IconArrowUpRight from '../assets/svg/IconArrowUpRight.svg';
import IconEyeFilled from '../assets/svg/IconEyeFilled.svg';
import { ALL_TEXTS, STEP_TO_BUILDER_PATH } from '../constants';
import { useWizard } from '../hooks';
import {
  awaitFor, platformSettings, t
} from '../utils';
import Button from './UI/Button';

const Header = ({ publishAgent }) => {
  const { state } = useWizard();

  const {
    step,
    isPublished,
    previewAgentId,
    isPublishLoading,
    platformSettings: { PLATFORM_PREVIEW_URL, PROVIDER_URL }
  } = state;

  const [buttonWrappeRoot, setButtonWrapperRoot] = useState(null);
  const [isLivePreviewLoading, setIsLivePreviewLoading] = useState(false);

  const handleJotformLink = async () => {
    saveInstallment('goToJotformButton');
    await awaitFor(1000);
    window.open(`${PROVIDER_URL}/agent/build/${previewAgentId}${STEP_TO_BUILDER_PATH[step]}`, '_blank');
  };

  const handleLivePreviewClick = async () => {
    const { PLATFORM_NONCE = '' } = platformSettings;
    saveInstallment('previewButton');
    setIsLivePreviewLoading(true);
    publishAgent({ key: 'preview' });
    await awaitFor(1000); // give some time to wordpress to process the request
    setIsLivePreviewLoading(false);
    window.open(`${PLATFORM_PREVIEW_URL}&_nonce=${PLATFORM_NONCE}`, '_blank');
  };

  const handlePublishClick = async () => {
    saveInstallment('publishButton');
    await publishAgent({ key: 'embed' });
  };

  useEffect(() => {
    setButtonWrapperRoot(document.querySelector('#button-wrapper-root'));
  }, []);

  if (!buttonWrappeRoot) return null;

  return createPortal(
    <div className='chatbot-header-cta-cont'>
      {/* go to jotform button */}
      <Button
        variant='ghost'
        colorStyle='secondary'
        className='go-to-jotform-cta'
        endIcon={<IconArrowUpRight />}
        onClick={handleJotformLink}
      >
        {t(ALL_TEXTS.GO_TO_JOTFORM)}
      </Button>
      {/* preview button */}
      <div className='mobile-cont'>
        <Button
          variant='outline'
          colorStyle='secondary'
          startIcon={<IconEyeFilled />}
          loader={isLivePreviewLoading}
          onClick={handleLivePreviewClick}
        >
          {t(ALL_TEXTS.PREVIEW)}
        </Button>
        {/* publish button */}
        <Button
          colorStyle='primary'
          loader={isPublishLoading}
          className={`publish-cta${isPublished ? '' : ' isPulseAnimation'}`}
          onClick={handlePublishClick}
          disabled={isPublished}
        >
          {isPublished ? t(ALL_TEXTS.PUBLISHED) : t(ALL_TEXTS.PUBLISH)}
        </Button>
      </div>
    </div>,
    buttonWrappeRoot
  );
};

Header.propTypes = {
  publishAgent: func.isRequired
};

export default Header;

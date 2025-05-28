import React, { useState } from 'react';
import { func } from 'prop-types';

import { saveInstallment } from '../api';
import IconArrowLeft from '../assets/svg/IconArrowLeft.svg';
import IconArrowRight from '../assets/svg/IconArrowRight.svg';
import IconArrowUpRight from '../assets/svg/IconArrowUpRight.svg';
import IconEyeFilled from '../assets/svg/IconEyeFilled.svg';
import introVideo from '../assets/videos/intro.mp4';
import { ALL_TEXTS, POSITION, STEPS } from '../constants';
import { useWizard } from '../hooks';
import { ACTION_CREATORS } from '../store';
import {
  awaitFor, platformSettings, t,
  toCamelCase
} from '../utils';
import Button from './UI/Button';

const Preview = ({
  savePlatformAgentEmbed = f => f
}) => {
  const {
    state, dispatch
  } = useWizard();

  const {
    step,
    previewAgentId,
    selectedTemplateAgentId,
    customizations: { position },
    platformSettings: {
      PROVIDER_URL, PLATFORM_PREVIEW_URL
    }
  } = state;

  const [isLivePreviewLoading, setIsLivePreviewLoading] = useState(false);

  const handleLivePreviewClick = async () => {
    const { PLATFORM_NONCE = '' } = platformSettings;
    saveInstallment('previewButton');
    setIsLivePreviewLoading(true);
    await savePlatformAgentEmbed('preview');
    await awaitFor(1000); // give some time to wordpress to process the request
    setIsLivePreviewLoading(false);
    window.open(`${PLATFORM_PREVIEW_URL}&_nonce=${PLATFORM_NONCE}`, '_blank');
  };

  const handleEditClick = () => {
    saveInstallment(`editButton_${toCamelCase(step)}Step`);
    dispatch(ACTION_CREATORS.setStep(STEPS.CUSTOMIZATION));
  };

  const handleViewConversationsClick = () => {
    saveInstallment(`viewConversationsButton_${toCamelCase(step)}Step`);
    window.open(`${PROVIDER_URL}/conversations/withAgent/${previewAgentId}`, '_blank');
  };

  return (
    <>
      {selectedTemplateAgentId && (
        <div className={`agent-preview-text align-${position}`}>
          {position === POSITION.LEFT && (
            <IconArrowLeft width={20} height={20} />
          )}
          <span>{t(ALL_TEXTS.PREVIEW_YOUR_AI_CHATBOT)}</span>
          {position === POSITION.RIGHT && (
            <IconArrowRight width={20} height={20} />
          )}
        </div>
      )}
      {[STEPS.INITIAL, STEPS.USECASE_SELECTION].includes(step) ? (
        <div className='introduction'>
          <video
            autoPlay
            loop
            muted
            playsInline
            src={introVideo}
            title={t(ALL_TEXTS.ANIMATION_TITLE)}
          />
        </div>
      ) : (
        <div className='agent-preview'>
          <div id='agent-preview-root' />
          {![STEPS.INITIAL, STEPS.USECASE_SELECTION, STEPS.WP_PAGE_SELECTION].includes(step) && (
            <div className='agent-preview--buttons'>
              {/* platform agent preview button */}
              <Button
                colorStyle='secondary'
                startIcon={<IconEyeFilled />}
                variant='outline'
                loader={isLivePreviewLoading}
                onClick={handleLivePreviewClick}
              >
                {t(ALL_TEXTS.LIVE_PREVIEW)}
              </Button>
            </div>
          )}
          {step === STEPS.WP_PAGE_SELECTION && (
            <div className='agent-preview--buttons'>
              {/* edit button */}
              <Button
                colorStyle='secondary'
                startIcon={<IconEyeFilled />}
                variant='outline'
                onClick={handleEditClick}
              >
                {t(ALL_TEXTS.EDIT)}
              </Button>
              {/* view conversations button */}
              <Button
                colorStyle='secondary'
                endIcon={<IconArrowUpRight />}
                variant='outline'
                onClick={handleViewConversationsClick}
              >
                {t(ALL_TEXTS.VIEW_CONVERSATIONS)}
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Preview;

Preview.propTypes = {
  savePlatformAgentEmbed: func
};

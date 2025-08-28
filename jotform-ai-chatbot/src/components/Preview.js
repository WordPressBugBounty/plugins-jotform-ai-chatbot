import React, { useEffect, useRef } from 'react';

import introVideo from '../assets/videos/intro.mp4';
import { ALL_TEXTS, STEPS } from '../constants';
import { useWizard } from '../hooks';
import { awaitFor, initAgent, t } from '../utils';

const Preview = () => {
  const { state } = useWizard();

  const {
    step,
    previewAgentId,
    customizations,
    selectedAvatar,
    themeCustomizations,
    agentName,
    agentRole,
    agentChattiness,
    agentLanguage,
    agentToneOfVoice,
    persona,
    materials
  } = state;

  const prevAvatarRef = useRef(selectedAvatar);

  useEffect(() => {
    const refreshAgent = async () => {
      const avatarChanged = prevAvatarRef.current !== selectedAvatar;

      if (avatarChanged) {
        await awaitFor(2500);
      }

      initAgent({
        agentId: previewAgentId,
        customizations,
        customAvatarUrl: selectedAvatar.avatarIconLink,
        ...themeCustomizations
      });

      // update previous avatar ref
      prevAvatarRef.current = selectedAvatar;
    };

    refreshAgent();
  }, [
    selectedAvatar,
    agentName,
    agentRole,
    agentLanguage,
    agentToneOfVoice,
    customizations,
    agentChattiness,
    persona,
    themeCustomizations,
    materials
  ]);

  return (
    <>
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
          <div className='agent-preview-bg' />
          <div id='agent-preview-root' />
          {![STEPS.INITIAL, STEPS.USECASE_SELECTION, STEPS.WP_PAGE_SELECTION].includes(step) && (
            <div />
          )}
        </div>
      )}
    </>
  );
};

export default Preview;

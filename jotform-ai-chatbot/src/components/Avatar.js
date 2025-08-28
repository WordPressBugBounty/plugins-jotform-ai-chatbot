/* eslint-disable react/button-has-type */
import React, {
  useCallback, useEffect, useRef
} from 'react';

import {
  getAvatars, updateAgent, updateAgentProperty
} from '../api';
import { ALL_TEXTS } from '../constants';
import { useInfiniteScroll, useWizard } from '../hooks';
import { ACTION_CREATORS } from '../store';
import {
  prepareAvatarPayload, swapItem
} from '../utils';

const Avatar = () => {
  const { state, asyncDispatch, dispatch } = useWizard();

  const {
    avatars,
    agentRole,
    selectedAvatar,
    avatarsOffset,
    previewAgentId,
    areAvatarsLoading,
    allAvatarsFetched,
    platformSettings: { PROVIDER_API_KEY }
  } = state;

  const containerRef = useRef(null);
  const { id: selectedAvatarId } = selectedAvatar;

  // fetch avatars
  const fetchAvatars = useCallback(async () => {
    const data = { limit: 27, nextPageOffset: avatarsOffset };
    await asyncDispatch(
      () => getAvatars(previewAgentId, data, PROVIDER_API_KEY),
      ACTION_CREATORS.getAvatarsRequest,
      ACTION_CREATORS.getAvatarsSuccess,
      ACTION_CREATORS.getAvatarsError
    );
  }, [previewAgentId, avatarsOffset]);

  // initial fetch
  useEffect(() => {
    fetchAvatars();
  }, []);

  // infinite scroll
  useInfiniteScroll(containerRef, {
    loading: areAvatarsLoading,
    hasMore: !allAvatarsFetched,
    onLoadMore: fetchAvatars
  });

  // select avatar
  const handleAvatarClick = async nextAvatar => {
    const avatarsWithNewOrder = swapItem(avatars, nextAvatar.id);
    dispatch(ACTION_CREATORS.setAvatars(avatarsWithNewOrder, nextAvatar));
    dispatch(ACTION_CREATORS.setAgentName(nextAvatar.avatarName));
    // update avatar
    const data = prepareAvatarPayload(nextAvatar);
    await asyncDispatch(
      () => updateAgentProperty(previewAgentId, data, PROVIDER_API_KEY),
      ACTION_CREATORS.updateAgentPropertyRequest,
      ACTION_CREATORS.updateAgentPropertySuccess,
      ACTION_CREATORS.updateAgentPropertyError
    );
    // update agent name
    await asyncDispatch(
      () => updateAgent(previewAgentId, { name: nextAvatar.avatarName }, PROVIDER_API_KEY),
      ACTION_CREATORS.updateAgentRequest,
      ACTION_CREATORS.updateAgentSuccess,
      ACTION_CREATORS.updateAgentError
    );
    // update agent title
    await asyncDispatch(
      () => updateAgent(previewAgentId, { title: `${nextAvatar.avatarName}: ${agentRole}` }, PROVIDER_API_KEY),
      ACTION_CREATORS.updateAgentRequest,
      ACTION_CREATORS.updateAgentSuccess,
      ACTION_CREATORS.updateAgentError
    );
  };

  return (
    <>
      <div className='jfpContent-wrapper--ai-persona-title'>
        <div>
          <h3>{ALL_TEXTS.AGENT_AVATAR}</h3>
          <p>{ALL_TEXTS.SELECT_AN_AVATAR}</p>
        </div>
        <div
          className='jfpContent-wrapper--avatar-gallery'
          ref={containerRef}
          role='radiogroup'
          aria-label={ALL_TEXTS.AGENT_AVATAR}
        >
          {avatars
            .map(avatar => (
              <button
                className='avatar-button'
                type='button'
                key={avatar.id}
                onClick={() => handleAvatarClick(avatar)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAvatarClick(avatar);
                  }
                }}
                aria-pressed={selectedAvatarId === avatar.id}
                aria-label={`${avatar.avatarName} ${selectedAvatarId === avatar.id ? ALL_TEXTS.CURRENT_AVATAR : ''}`}
                tabIndex={0}
              >
                <img src={avatar.avatarIconLink} alt={`Avatar ${avatar.avatarName}`} />
                {selectedAvatarId === avatar.id && (
                  <div className='avatar-button--selected'>
                    <span>{ALL_TEXTS.CURRENT_AVATAR}</span>
                  </div>
                )}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default Avatar;

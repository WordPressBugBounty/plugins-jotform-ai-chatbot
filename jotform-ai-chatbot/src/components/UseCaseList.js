/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback } from 'react';
import { string } from 'prop-types';

import { USE_CASES } from '../constants';
import { useWizard } from '../hooks';
import { ACTION_CREATORS } from '../store';
import { t } from '../utils';

const UseCaseList = ({ selectedTemplateAgentId }) => {
  const { dispatch } = useWizard();

  const handleTemplateChange = useCallback(async value => {
    dispatch(ACTION_CREATORS.selectAgent(value));
  }, []);

  return (
    <ul className='content-wrapper--list'>
      {USE_CASES.map(({ templateAgentId: tempAgentId, label }) => (
        <li
          key={tempAgentId}
          className={selectedTemplateAgentId === tempAgentId ? 'isSelected' : ''}
          onClick={() => handleTemplateChange(tempAgentId, label)}
        >
          {t(label)}
        </li>
      ))}
    </ul>
  );
};

export default UseCaseList;

UseCaseList.propTypes = {
  selectedTemplateAgentId: string.isRequired
};

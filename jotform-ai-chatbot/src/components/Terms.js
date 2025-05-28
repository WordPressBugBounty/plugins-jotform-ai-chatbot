import React from 'react';
import { string } from 'prop-types';

import { useWizard } from '../hooks';
import { ACTION_CREATORS } from '../store';
import Checkbox from './UI/Checkbox';

const Terms = ({ className }) => {
  const { state, dispatch } = useWizard();
  const { user, termsChecked } = state;
  const { AIAgentBetaAccepted = '' } = user || {};

  const handleTermsChange = e => {
    dispatch(ACTION_CREATORS.termsChecked(e.target.checked));
  };

  return AIAgentBetaAccepted !== '1' && (
    <div className={`first-step--terms ${className}`}>
      <Checkbox
        onChange={e => handleTermsChange(e)}
        size='small'
        checked={termsChecked}
      />
      <span>
        I have read and accept the <a href='/jotform-inc-beta-tester-and-confidentiality-agreement/' target='_blank'>Beta Program Terms and Conditions</a>.
      </span>
    </div>
  );
};

Terms.propTypes = {
  className: string
};

Terms.defaultProps = {
  className: ''
};

export default Terms;

import React from 'react';
import { string } from 'prop-types';

import { ALL_TEXTS } from '../../../constants';
import { translationRenderer } from '../../../utils';
import { IconExclamationTriangle } from '../../UI/Icon';

const PermalinkError = ({ platformDomain }) => (
  <div className='jfpContent-wrapper--settings-options-wrapper-info-box jfpError'>
    <div className='jfpContent-wrapper--settings-options-wrapper-info-box-icon'>
      <IconExclamationTriangle />
    </div>
    <div className='jfpContent-wrapper--settings-options-wrapper-info-box-message'>
      {translationRenderer(ALL_TEXTS.WOOCOMMERCE_PERMALINK_ERROR)({
        renderer1: str => (
          <strong>{str}</strong>),
        renderer2: str => (
          <a className='jfpContent-wrapper--settings-options-wrapper-info-box-link' href={`${platformDomain}/wp-admin/options-permalink.php`} target='_blank' rel='noreferrer'>{str}</a>)
      })}
    </div>
  </div>
);

PermalinkError.propTypes = {
  platformDomain: string.isRequired
};

export default PermalinkError;

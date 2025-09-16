import React, { useRef } from 'react';
import { func } from 'prop-types';

import { ALL_TEXTS } from '../../../constants';
import { t } from '../../../utils';
import Button from '../../UI/Button';
import { IconExclamationCircle, IconPlus } from '../../UI/Icon';
import Input from '../../UI/Input';

const StoreConnection = ({ setWoocommerceSettings }) => {
  const consumerKeyRef = useRef('');
  const consumerSecrefRef = useRef('');

  const handleConnectClick = () => {
    const consumerKey = consumerKeyRef.current.value;
    const consumerSecret = consumerSecrefRef.current.value;
    if (!consumerKey || !consumerSecret) return;
    setWoocommerceSettings({
      key: consumerKey,
      secret: consumerSecret
    });
  };

  return (
    <>
      {/* consumer key and secret */}
      <div className='jfpContent-wrapper--settings-options-wrapper-input-wrapper'>
        <div className='jfpContent-wrapper--settings-options-wrapper-input'>
          <div className='jfpContent-wrapper--settings-options-wrapper-input-title'>
            <h3>{t(ALL_TEXTS.CONSUMER_KEY)}</h3>
            <p>{t(ALL_TEXTS.YOUR_WOO_COMMERCE_API_KEY)}</p>
          </div>
          {/* todo: add show/hide key */}
          <Input
            type='input'
            ref={consumerKeyRef}
            placeholder={t(ALL_TEXTS.KEY_PLACEHOLDER)}
          />
        </div>
        <div className='jfpContent-wrapper--settings-options-wrapper-input'>
          <div className='jfpContent-wrapper--settings-options-wrapper-input-title'>
            <h3>{t(ALL_TEXTS.CONSUMER_SECRET)}</h3>
            <p>{t(ALL_TEXTS.YOUR_WOO_COMMERCE_API_SECRET)}</p>
          </div>
          {/* todo: add show/hide key */}
          <Input
            type='password'
            ref={consumerSecrefRef}
            placeholder={t(ALL_TEXTS.SECRET_PLACEHOLDER)}
          />
        </div>
      </div>
      {/* info box */}
      <div className='jfpContent-wrapper--settings-options-wrapper-info-box'>
        <div className='jfpContent-wrapper--settings-options-wrapper-info-box-icon'>
          <IconExclamationCircle />
        </div>
        <div className='jfpContent-wrapper--settings-options-wrapper-info-box-message'>
          {t(ALL_TEXTS.WOO_COMMERCE_INFO_BOX)}
          <strong>{t(ALL_TEXTS.WOO_COMMERCE_EMP)}</strong>
        </div>
      </div>
      {/* connect btn */}
      <div>
        <Button
          startIcon={<IconPlus />}
          colorStyle='primary'
          onClick={handleConnectClick}
        >
          {t(ALL_TEXTS.CONNECT)}
        </Button>
      </div>
    </>
  );
};

StoreConnection.propTypes = {
  setWoocommerceSettings: func.isRequired
};

export default StoreConnection;

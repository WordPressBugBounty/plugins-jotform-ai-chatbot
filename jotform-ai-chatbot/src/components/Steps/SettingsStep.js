import React from 'react';

import { updateWoocommerce } from '../../api';
import WooLogo from '../../assets/svg/woo-logo.svg';
import { ALL_TEXTS, WOO_COMMERCE_PROPERTIES } from '../../constants';
import { useWizard } from '../../hooks';
import { ACTION_CREATORS } from '../../store';
import { t } from '../../utils';
import Button from '../UI/Button';
import { IconExclamationCircle, IconPlus } from '../UI/Icon';
import Input from '../UI/Input';
import Toggle from '../UI/Toggle';

const SettingsStep = () => {
  const {
    dispatch, asyncDispatch, state
  } = useWizard();

  const { woocommerce, platformSettings: { PROVIDER_API_KEY } } = state;
  const {
    [WOO_COMMERCE_PROPERTIES.CONSUMER_KEY]: consumerKey,
    [WOO_COMMERCE_PROPERTIES.CONSUMER_SECRET]: consumerSecret,
    [WOO_COMMERCE_PROPERTIES.PRODUCT_FILTER]: showProducts,
    [WOO_COMMERCE_PROPERTIES.PRODUCT_RECOMMENDATION]: recommendProducts,
    [WOO_COMMERCE_PROPERTIES.ADD_TO_CART]: addAndUpdateCart,
    [WOO_COMMERCE_PROPERTIES.ORDER_TRACKING]: showOrderStatus
  } = woocommerce;

  // 'domain' => 'jfconversion.com',
  // 'agentId' => '0198e6cd508b7eac8751b40b874af01dd7be',
  // 'consumerKey' => 'ck_ffe5b098dc6cc2ad320154c003cee54354497400',
  // 'consumerSecret' => 'cs_bbc908ad306ca1c4521b6736c49bab93fcf10233',
  // 'integrationOptions' => ["product_filter","product_recommendation", "add_to_cart", "order_tracking", "refund_request"]
  const updateWoocommerceSettings = async () => {
    await asyncDispatch(
      () => updateWoocommerce({}, PROVIDER_API_KEY),
      ACTION_CREATORS.updateWoocommerceSettingsRequest,
      ACTION_CREATORS.updateWoocommerceSettingsSuccess,
      ACTION_CREATORS.updateWoocommerceSettingsError
    );
  };

  const handleConsumerKeyChange = e => {
    const { value } = e.target;
    dispatch(ACTION_CREATORS.setWoocommerceProperty(WOO_COMMERCE_PROPERTIES.CONSUMER_KEY, value));
    updateWoocommerceSettings();
  };

  const handleConsumerSecretChange = e => {
    const { value } = e.target;
    dispatch(ACTION_CREATORS.setWoocommerceProperty(WOO_COMMERCE_PROPERTIES.CONSUMER_SECRET, value));
    updateWoocommerceSettings();
  };

  const handleToggleChange = (property, value) => {
    dispatch(ACTION_CREATORS.setWoocommerceProperty(property, value));
    updateWoocommerceSettings();
  };

  return (
    <div className='jfpContent-wrapper--settings'>
      <div className='jfpContent-wrapper--settings-panel'>
        <div className='jfpContent-wrapper--settings-panel-title'>
          <h2 className='jfpContent-wrapper--settings-panel-title-content'>{t(ALL_TEXTS.SETTINGS)}</h2>
        </div>
        <ul>
          <li className='jfpContent-wrapper--settings-panel-btn'>
            <Button
              colorStyle='secondary'
              variant='ghost'
              fullWidth
            >
              {t(ALL_TEXTS.GENERAL)}
            </Button>
          </li>
          <li className='jfpContent-wrapper--settings-panel-btn'>
            <Button
              colorStyle='secondary'
              variant='ghost'
              fullWidth
            >
              {t(ALL_TEXTS.AGENT_SKILLS)}
            </Button>
          </li>
          <li className='jfpContent-wrapper--settings-panel-btn'>
            <Button
              colorStyle='secondary'
              variant='ghost'
              fullWidth
              className='isActive'
            >
              {t(ALL_TEXTS.WOO_COMMERCE)}
              {' '}
              <span className='new-badge'>New</span>
            </Button>
          </li>
        </ul>
      </div>
      <div className='jfpContent-wrapper--settings-options'>
        <div className='jfpContent-wrapper--settings-options-wrapper'>
          <h2 className='jfpContent-wrapper--settings-options-wrapper-title'>{t(ALL_TEXTS.WOOCOMMERCE_STORE_SETTINGS)}</h2>
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
                value={consumerKey}
                placeholder={t(ALL_TEXTS.KEY_PLACEHOLDER)}
                onChange={handleConsumerKeyChange}
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
                value={consumerSecret}
                placeholder={t(ALL_TEXTS.SECRET_PLACEHOLDER)}
                onChange={handleConsumerSecretChange}
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
              onClick={f => f}
            >
              {t(ALL_TEXTS.CONNECT)}
            </Button>
          </div>
          {/* connected banner */}
          <div className='jfpContent-wrapper--settings-options-wrapper-connected'>
            <div className='jfpContent-wrapper--settings-options-wrapper-connected-wrapper'>
              <WooLogo className='jfpContent-wrapper--settings-options-wrapper-connected-icon' />
              <div className='jfpContent-wrapper--settings-options-wrapper-connected-content'>
                <h3>Connected Store</h3>
                <p>********************qrstuv</p>
              </div>
            </div>
            <Button
              colorStyle='error'
              variant='outline'
              size='small'
              className='jfpContent-wrapper--settings-options-wrapper-connected-btn'
              onClick={f => f}
            >
              {t(ALL_TEXTS.DISCONNECT_STORE)}
            </Button>
          </div>
          <div className='jfpContent-wrapper--settings-options-ability'>
            {/* chatbot abilities */}
            <h3 className='jfpContent-wrapper--settings-options-ability-title'>{t(ALL_TEXTS.CHATBOT_ABILITIES)}</h3>
            <div className='jfpContent-wrapper--settings-options-ability-wrapper isDisabled'>
              {/* show products */}
              <div className='jfpContent-wrapper--settings-options-ability-select'>
                <div>
                  <h4>{t(ALL_TEXTS.SHOW_PRODUCTS)}</h4>
                  <p>{t(ALL_TEXTS.DISPLAY_AVAILABLE_PRODUCTS)}</p>
                </div>
                <Toggle checked={showProducts} onChange={() => handleToggleChange(WOO_COMMERCE_PROPERTIES.PRODUCT_FILTER, !showProducts)} />
              </div>
              {/* recommend products */}
              <div className='jfpContent-wrapper--settings-options-ability-select'>
                <div>
                  <h4>{t(ALL_TEXTS.RECOMMEND_PRODUCTS)}</h4>
                  <p>{t(ALL_TEXTS.SUGGEST_PERSONALIZED_PRODUCTS)}</p>
                </div>
                <Toggle checked={recommendProducts} onChange={() => handleToggleChange(WOO_COMMERCE_PROPERTIES.PRODUCT_RECOMMENDATION, !recommendProducts)} />
              </div>
              {/* add & update cart */}
              <div className='jfpContent-wrapper--settings-options-ability-select'>
                <div>
                  <h4>{t(ALL_TEXTS.ADD_UPDATE_CART)}</h4>
                  <p>{t(ALL_TEXTS.ADD_PRODUCTS)}</p>
                </div>
                <Toggle checked={addAndUpdateCart} onChange={() => handleToggleChange(WOO_COMMERCE_PROPERTIES.ADD_TO_CART, !addAndUpdateCart)} />
              </div>
              {/* show order status */}
              <div className='jfpContent-wrapper--settings-options-ability-select'>
                <div>
                  <h4>{t(ALL_TEXTS.SHOW_ORDER_STATUS)}</h4>
                  <p>{t(ALL_TEXTS.SHARE_REAL_TIME_UPDATE)}</p>
                </div>
                <Toggle checked={showOrderStatus} onChange={() => handleToggleChange(WOO_COMMERCE_PROPERTIES.ORDER_TRACKING, !showOrderStatus)} />
              </div>
              {/* manage refunds */}
              <div className='jfpContent-wrapper--settings-options-ability-select'>
                <div>
                  <h4>{t(ALL_TEXTS.MANAGE_REFUNDS)}<span className='badge'>{t(ALL_TEXTS.COMING_SOON)}</span></h4>
                  <p>{t(ALL_TEXTS.HANDLE_REFUND_REQUESTS)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsStep;

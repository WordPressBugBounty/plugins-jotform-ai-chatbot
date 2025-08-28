import React, { useEffect } from 'react';

import { saveInstallment } from '../api';
import WhatsNewImg from '../assets/images/whats-new-img.png';
import { ALL_TEXTS, WHATS_NEW_MODAL_LCST_FLAG } from '../constants';
import { useLocalStorageModal } from '../hooks';
import { t } from '../utils';
import Button from './UI/Button';
import Modal from './UI/Modal';

const WhatsNewModal = () => {
  const [isModalVisible, closeModal] = useLocalStorageModal(WHATS_NEW_MODAL_LCST_FLAG);

  useEffect(() => {
    if (isModalVisible) {
      saveInstallment('whatsNewDialog_v3_0_0');
    }
  }, [isModalVisible]);

  return (
    <Modal
      open={isModalVisible}
      onClose={closeModal}
      ariaLabel={t(ALL_TEXTS.WHATS_NEW)}
      size='medium'
      className='jfModal--whats-new'
    >
      <div className='jfModal--header'>
        <div className='jfModal--header-title'>
          <h3>{t(ALL_TEXTS.WHATS_NEW)}</h3>
          <p>{t(ALL_TEXTS.GET_THE_LATEST_CHANGES_AND_UPDATES)}</p>
        </div>
      </div>
      <div className='jfModal--body'>
        <img src={WhatsNewImg} className='jfModal--body-img' alt='Chatbot Whats New' />
        <ul className='jfModal--body-list'>
          <li><span>Conversations in Plugin –</span> view and manage user chats directly from your WordPress dashboard</li>
          <li><span>Improved UI –</span> a cleaner look for easier navigation</li>
          <li><span>Advanced Visibility –</span> control when and where your chatbot appears</li>
          <li><span>More Control –</span> fine-tune limits, tone, and escalation rules</li>
          <li><span>UX Improvements –</span> better flow, clearer errors, smoother interactions</li>
        </ul>
      </div>
      <div className='jfModal--footer'>
        <Button
          colorStyle='primary'
          // variant='outline'
          onClick={closeModal}
        >
          {t(ALL_TEXTS.TRY_IT_NOW)}
        </Button>
      </div>
    </Modal>
  );
};

export default WhatsNewModal;

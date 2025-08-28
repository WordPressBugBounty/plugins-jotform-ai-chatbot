import React, { useEffect } from 'react';
import { bool, func } from 'prop-types';

import { saveInstallment } from '../api';
import IconXmarkCircle from '../assets/svg/IconXmarkCircle.svg';
import { ALL_TEXTS } from '../constants';
import { t } from '../utils';
import Button from './UI/Button';
import { IconExclamationCircleFilled } from './UI/Icon';
import Modal from './UI/Modal';

const DeleteModal = ({
  isOpen,
  isDeleteLoading,
  isUnpublishLoading,
  onUnpublishClick,
  onDeleteClick,
  onCloseClick,
  isPublished
}) => {
  useEffect(() => {
    if (isOpen) {
      saveInstallment('deleteDialog');
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onCloseClick}
      ariaLabel={t(ALL_TEXTS.REMOVE_CHATBOT_FROM_WEBSITE)}
      size='small'
    >
      <div className='jfModal--title'>
        <div className='jfModal--title-icon jfModal--title-icon-error'>
          <IconXmarkCircle />
        </div>
        <h3>
          {t(ALL_TEXTS.REMOVE_CHATBOT_FROM_WEBSITE)}
        </h3>
        <p style={{ marginBottom: 0 }}>
          {t(ALL_TEXTS.YOU_CAN_EITHER_UNPUBLISH_OR_REMOVED_THE_CHATBOT)}
        </p>
        <div className='jfModal--title-info'>
          <IconExclamationCircleFilled className='jfModal--title-info-icon' />
          <p>{t(ALL_TEXTS.WITH_BOTH_OPTIONS_YOUR_CHATBOT)}</p>
        </div>
      </div>
      <div className='jfModal--actions'>
        <Button
          colorStyle='secondary'
          variant='outline'
          loader={isUnpublishLoading}
          onClick={onUnpublishClick}
          disabled={!isPublished}
        >
          {t(ALL_TEXTS.UNPUBLISH)}
        </Button>
        <Button
          colorStyle='error'
          loader={isDeleteLoading}
          onClick={onDeleteClick}
        >
          {t(ALL_TEXTS.REMOVE_FROM_WEBSITE)}
        </Button>
      </div>
    </Modal>
  );
};

DeleteModal.propTypes = {
  isOpen: bool.isRequired,
  onDeleteClick: func.isRequired,
  onCloseClick: func.isRequired,
  onUnpublishClick: func.isRequired,
  isDeleteLoading: bool,
  isUnpublishLoading: bool,
  isPublished: bool
};

export default DeleteModal;

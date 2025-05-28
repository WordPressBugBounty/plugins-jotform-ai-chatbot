import React from 'react';
import { bool, func } from 'prop-types';

import IconTrashExclamationFilled from '../assets/svg/IconTrashExclamationFilled.svg';
import { ALL_TEXTS } from '../constants';
import { t } from '../utils';
import Button from './UI/Button';
import Modal from './UI/Modal';

const DeleteModal = ({ isOpen, onDeleteClick, onCloseClick }) => (
  <Modal
    open={isOpen}
    onClose={onCloseClick}
    ariaLabel={t(ALL_TEXTS.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_CHATBOT)}
    size='small'
  >
    <div className='jfModal--title'>
      <div className='jfModal--title-icon jfModal--title-icon-error'>
        <IconTrashExclamationFilled />
      </div>
      <h3>
        {t(ALL_TEXTS.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_CHATBOT)}
      </h3>
      <p>
        {t(ALL_TEXTS.THIS_ACTION_IS_PERMANENT_AND_CANNOT_BE_UNDONE)}
      </p>
    </div>
    <div className='jfModal--actions'>
      <Button
        colorStyle='secondary'
        variant='outline'
        onClick={onCloseClick}
      >
        {t(ALL_TEXTS.CANCEL)}
      </Button>
      <Button
        colorStyle='error'
        onClick={onDeleteClick}
      >
        {t(ALL_TEXTS.DELETE_AI_CHATBOT)}
      </Button>
    </div>
  </Modal>
);

DeleteModal.propTypes = {
  isOpen: bool.isRequired,
  onDeleteClick: func.isRequired,
  onCloseClick: func.isRequired
};

export default DeleteModal;

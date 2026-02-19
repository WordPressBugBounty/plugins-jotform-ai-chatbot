import React from 'react';
import { bool, func } from 'prop-types';

import IconTrashExclamationFilled from '../../assets/svg/IconTrashExclamationFilled.svg';
import { ALL_TEXTS } from '../../constants';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

const MaterialDeleteModal = ({ isOpen, onDeleteClick, onCloseClick }) => (
  <Modal
    open={isOpen}
    onClose={onCloseClick}
    ariaLabel={ALL_TEXTS.MATERIAL_CONFIRMATION_MODAL}
    size='small'
  >
    <div className='jfModal--title'>
      <div className='jfModal--title-icon jfModal--title-icon-error' aria-hidden='true'>
        <IconTrashExclamationFilled />
      </div>
      <h3>
        {ALL_TEXTS.DO_YOU_WANT_TO_DELETE_THIS_MATERIAL}
      </h3>
      <p>
        {ALL_TEXTS.ONCE_REMOVED_THE_AI_AGENT_WILL_NO_LONGER_HAVE_ACCESS_TO_IT}
      </p>
    </div>
    <div className='jfModal--actions'>
      <Button
        colorStyle='secondary'
        variant='outline'
        onClick={onCloseClick}
      >
        {ALL_TEXTS.NO_KEEP}
      </Button>
      <Button
        colorStyle='error'
        onClick={onDeleteClick}
      >
        {ALL_TEXTS.YES_DELETE}
      </Button>
    </div>
  </Modal>
);

MaterialDeleteModal.propTypes = {
  isOpen: bool.isRequired,
  onDeleteClick: func.isRequired,
  onCloseClick: func.isRequired
};

export default MaterialDeleteModal;

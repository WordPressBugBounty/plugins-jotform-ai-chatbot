import React, { useRef, useState } from 'react';
import { bool, func, object } from 'prop-types';

import { ALL_TEXTS, TRAIN_TYPES } from '../../../constants';
import { getNonValidInputs } from '../../../utils';
import Button from '../../UI/Button.js';
import Input from '../../UI/Input.js';
import Textarea from '../../UI/Textarea.js';
import LabelWrapperItem from '../LabelWrapperItem.js';

const TrainText = ({
  handleSave,
  isLoading,
  editingMaterial
}) => {
  const inputRef = useRef(null);
  const [inputValidation, setInputValidation] = useState([]);
  const [changedMaterialData, setChangedMaterialData] = useState({});

  const handleMaterialDataChange = e => {
    const { id, value } = e.target;
    setChangedMaterialData({ ...changedMaterialData, [id]: value });
  };
  const isEditingMode = !!editingMaterial;

  const validateAndSend = () => {
    // TODO: show warning message
    if (inputRef.current?.value?.trim() === '') return;
    if (inputRef.current) {
      setInputValidation(getNonValidInputs(inputRef.current.value, 'text'));
      if (inputValidation.length === 0) {
        return handleSave({
          type: 'TEXT',
          ...changedMaterialData,
          ...(isEditingMode && { status: editingMaterial?.status === 'ACTION_REQUIRED' ? 'PROCESSED' : editingMaterial?.status })
        });
      }
    }
  };

  const inputMaxLength = document.location.href.indexOf('icLimits') > -1 ? 250000 : 10000; // a small hack for our own training data

  return (
    <div className='jfMaterialEditor--container'>
      <div className='jfMaterialEditor--inner'>
        {isEditingMode && (
          <LabelWrapperItem heading='Title' desc=''>
            <Input
              id='title'
              onChange={handleMaterialDataChange}
              defaultValue={editingMaterial?.title || TRAIN_TYPES.TEXT.name}
            />
          </LabelWrapperItem>
        )}

        <LabelWrapperItem
          heading={ALL_TEXTS.INFORMATION_FOR_YOUR_CHATBOT}
          desc={ALL_TEXTS.ENTER_ACCURATE_INFO_YOUR_AI_CAN_USE_AS_ANSWERS}
        >
          <Textarea
            id='data'
            onChange={handleMaterialDataChange}
            size='medium'
            defaultValue={editingMaterial?.data}
            placeholder={ALL_TEXTS.COMPANY_OVERVIEW}
            style={{ height: '140px' }}
            // colorStyle={inputValidation.includes('text') ? 'error' : 'default'}
            maxLength={inputMaxLength}
            ref={inputRef}
          />
        </LabelWrapperItem>

      </div>
      <div className='jfMaterialEditor--footer'>
        <Button
          size='medium'
          colorStyle='success'
          loader={isLoading}
          onClick={validateAndSend}
        >
          {ALL_TEXTS.SAVE}
        </Button>
      </div>
    </div>
  );
};

TrainText.propTypes = {
  handleSave: func.isRequired,
  isLoading: bool,
  editingMaterial: object
};
export default TrainText;

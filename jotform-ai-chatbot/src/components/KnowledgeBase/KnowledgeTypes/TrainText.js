import React, { useRef, useState } from 'react';
import { bool, func, object } from 'prop-types';

import { TRAIN_TYPES } from '../../../constants';
import { getNonValidInputs, t } from '../../../utils';
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
          heading='Knowledge for Your AI'
          desc='Write an info that the AI can use to provide accurate answers'
        >
          <Textarea
            id='data'
            onChange={handleMaterialDataChange}
            size='medium'
            defaultValue={editingMaterial?.data}
            placeholder={t('Company overview, product features, customer FAQs, service guidelines...')}
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
          {t('Save')}
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

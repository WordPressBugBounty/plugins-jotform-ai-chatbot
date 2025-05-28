import React, { useRef, useState } from 'react';
import { bool, func, object } from 'prop-types';

import { TRAIN_TYPES } from '../../../constants';
import { getNonValidInputs, t } from '../../../utils';
import Button from '../../UI/Button.js';
import Input from '../../UI/Input.js';
import LabelWrapperItem from '../LabelWrapperItem.js';

const URLInput = ({
  handleSave,
  isLoading,
  setErrorMsg,
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
      setInputValidation(getNonValidInputs(inputRef.current.value, 'url'));
      if (inputValidation.length === 0) {
        return handleSave({
          type: 'URL',
          ...changedMaterialData,
          ...(isEditingMode && { status: editingMaterial?.status === 'ACTION_REQUIRED' ? 'PROCESSED' : editingMaterial?.status })
        });
      }
      if (inputValidation.includes('invalid-url')) {
        setErrorMsg('Please enter a valid URL.');
      }
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      validateAndSend();
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-6 bg-white p-6 radius-md border border-navy-100'>
        {isEditingMode && (
          <LabelWrapperItem heading='Title' desc='' customClass='p-0'>
            <Input
              id='title'
              onChange={handleMaterialDataChange}
              defaultValue={editingMaterial?.title || TRAIN_TYPES.URL.name}
            />
          </LabelWrapperItem>
        )}

        <LabelWrapperItem
          heading='Enter a URL'
          desc='Train the AI based on content from the document'
          customClass='p-0'
        >
          <Input
            id='url'
            onChange={handleMaterialDataChange}
            className='w-full'
            size='large'
            placeholder='example.com'
            onKeyDown={handleKeyDown}
            defaultValue={editingMaterial?.meta?.url.replace(/^https?:\/\//, '')}
            // prefix={{
            //   as: 'label',
            //   htmlFor: 'formInputURL',
            //   text: 'https://',
            //   variant: 'filled'
            // }}
            type='url'
            colorStyle={inputValidation.includes('url') ? 'error' : 'default'}
            ref={inputRef}
          />
        </LabelWrapperItem>
      </div>
      <div className='flex justify-end'>
        <Button
          className='w-24'
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

URLInput.propTypes = {
  handleSave: func.isRequired,
  isLoading: bool,
  setErrorMsg: func.isRequired,
  editingMaterial: object
};

export default URLInput;

import React, { useMemo, useRef, useState } from 'react';
import { getOr } from 'lodash/fp';
import { bool, func, object } from 'prop-types';

import { TRAIN_TYPES } from '../../../constants';
import { t } from '../../../utils';
import Button from '../../UI/Button.js';
import Input from '../../UI/Input.js';
import LabelWrapperItem from '../LabelWrapperItem.js';

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// eslint-disable-next-line no-unused-vars
const getIconName = file => (file?.type.indexOf('pdf') > -1 ? 'document_pdf' : 'document_doc');

const ListFile = ({
  // eslint-disable-next-line react/prop-types
  selectedFile, setMockFile, setActualFile
}) => (
  <div
    className='flex items-center bg-file-upload px-4 py-2 radius border-dashed border border-navy-100'
  >
    {/* <Icon
      name={selectedFile ? getIconName(selectedFile) : 'document_pdf'}
      className='w-6 h-6 mr-2'
      fill='#343c6a'
    /> */}
    {/* eslint-disable-next-line react/prop-types */}
    <p className='text-sm color-navy-700 grow-1 text-overflow-ellipsis overflow-hidden whitespace-nowrap'>{selectedFile?.name}</p>
    <Button
      variant='ghost'
      className='hover-bg-color-transparent pt-1 w-8 h-8'
      onClick={() => {
        setMockFile();
        setActualFile();
      }}
    >
      {/* <Icon name='xmarksm' fill='#C8CEED' /> */}
    </Button>
  </div>
);

const UploadDocument = ({
  isLoading,
  handleSave,
  setErrorMsg,
  editingMaterial
}) => {
  const [actualFile, setActualFile] = useState();
  const [mockFile, setMockFile] = useState(editingMaterial?.meta ? { name: editingMaterial.meta.fileName, type: editingMaterial.meta.fileName } : undefined);
  const selectedFile = useMemo(() => actualFile || mockFile, [actualFile, mockFile]);
  const fileInputRef = useRef(null);
  const [changedMaterialData, setChangedMaterialData] = useState({});

  const handleMaterialDataChange = e => {
    const { id, value } = e.target;
    setChangedMaterialData({ ...changedMaterialData, [id]: value });
  };
  const isEditingMode = !!editingMaterial;

  const handleFileSelect = file => {
    if (ALLOWED_FILE_TYPES.includes(file.type)) {
      setActualFile(file);
      handleMaterialDataChange({ target: { id: 'file', value: file } });
    } else {
      setErrorMsg(t('Please upload a PDF or DOCX file'));
    }
  };

  const handleDrop = e => {
    e.preventDefault();

    const file = getOr(null, '[0]', e.dataTransfer.files);
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = e => {
    const file = getOr(null, '[0]', e.target.files);
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadButtonClick = () => {
    handleSave({
      type: 'DOCUMENT',
      ...changedMaterialData,
      ...(isEditingMode && { status: editingMaterial?.status === 'ACTION_REQUIRED' ? 'PROCESSED' : editingMaterial?.status })
    });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const UploadFile = () => (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      className='flex flex-col items-center px-8 py-10 radius bg-file-upload border-dashed border border-navy-100 gap-1'
    >
      {/* <Icon name='cloud_arrow_up' fill='#C8CEED' className='w-12 h-12' /> */}
      <span className='text-sm font-medium color-navy-700'>{t('Upload a Document')}</span>
      <p className='text-xs font-medium color-navy-500'>
        <span>
          Drag and drop your files here or
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
          <span className='underline cursor-pointer color-blue-500' onClick={() => fileInputRef.current?.click()}> upload a file</span>
        </span>
      </p>
      <input
        type='file'
        onChange={handleFileInputChange}
        className='hidden'
        ref={fileInputRef}
      />
    </div>
  );

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-6 bg-white p-6 radius-md border border-navy-100'>
        {isEditingMode && (
          <LabelWrapperItem
            heading='Title'
            desc=''
            customClass='p-0'
          >
            <Input
              id='title'
              onChange={handleMaterialDataChange}
              defaultValue={editingMaterial?.title || TRAIN_TYPES.DOCUMENT.name}
            />
          </LabelWrapperItem>
        )}

        <LabelWrapperItem
          heading='Upload Document'
          desc='Train the AI based on content from the document'
          customClass='p-0'
        >
          {selectedFile
            ? <ListFile {...{ selectedFile, setMockFile, setActualFile }} />
            : <UploadFile />}
        </LabelWrapperItem>
      </div>
      <div className='flex justify-end'>
        <Button
          className='w-24'
          size='medium'
          colorStyle='success'
          loader={isLoading}
          onClick={handleUploadButtonClick}
          disabled={!selectedFile}
        >
          {t('Save')}
        </Button>
      </div>
    </div>
  );
};

UploadDocument.propTypes = {
  handleSave: func.isRequired,
  isLoading: bool,
  setErrorMsg: func.isRequired,
  editingMaterial: object
};

export default UploadDocument;

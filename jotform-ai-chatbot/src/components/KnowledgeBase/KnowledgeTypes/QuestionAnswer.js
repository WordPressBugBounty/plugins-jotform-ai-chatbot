import React, { useRef, useState } from 'react';
import { bool, func, object } from 'prop-types';

import { getNonValidInputs, safeJSONParse, t } from '../../../utils/index.js';
import Button from '../../UI/Button.js';
import Input from '../../UI/Input.js';
import Textarea from '../../UI/Textarea.js';
import LabelWrapperItem from '../LabelWrapperItem.js';

const QuestionAnswer = ({
  isLoading,
  handleSave,
  editingMaterial
}) => {
  const questionRef = useRef(null);
  const answerRef = useRef(null);
  const editingQA = safeJSONParse(editingMaterial?.data);
  const [inputValidation, setInputValidation] = useState([]);

  const isEditingMode = !!editingMaterial;

  const validateAndSend = () => {
    if (questionRef.current && answerRef.current) {
      setInputValidation(getNonValidInputs({ question: questionRef.current, answer: answerRef.current }, 'qa'));
      if (inputValidation.length === 0) {
        return handleSave({
          type: 'QA',
          data: JSON.stringify({ question: questionRef.current, answer: answerRef.current }),
          ...(isEditingMode && { status: editingMaterial?.status === 'ACTION_REQUIRED' ? 'PROCESSED' : editingMaterial?.status })
        });
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
        <LabelWrapperItem
          heading='Question'
          desc='Train the AI based on your questions & answers'
          customClass='p-0'
        >
          <div className='flex flex-col gap-2'>
            <Input
              className='w-full'
              size='medium'
              placeholder={t('How early will a hotel let you check-in?')}
              colorStyle={inputValidation.includes('question') ? 'error' : 'default'}
              onKeyDown={handleKeyDown}
              defaultValue={editingQA?.question}
              ref={questionRef}
            />
            <span className='text-md font-medium color-navy-700 mt-3'>{t('Answer')}</span>
            <Textarea
              className='w-full h-52 border border-navy-100 radius'
              size='medium'
              defaultValue={editingQA?.answer}
              resize='vertical'
              placeholder={t('Around two hours early.')}
              colorStyle={inputValidation.includes('answer') ? 'error' : 'default'}
              ref={answerRef}
            />
          </div>
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

QuestionAnswer.propTypes = {
  isLoading: bool.isRequired,
  handleSave: func.isRequired,
  editingMaterial: object
};

export default QuestionAnswer;

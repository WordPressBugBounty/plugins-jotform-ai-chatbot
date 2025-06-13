import React, { useEffect, useState } from 'react';

import { interactWithPlatform, saveInstallment } from '../../api';
import { ALL_TEXTS, DELETE_INST_NAME } from '../../constants';
import { useEffectIgnoreFirst, useWizard } from '../../hooks';
import { ACTION_CREATORS } from '../../store';
import {
  getPath,
  initAgent, isMobile, t, toCamelCase,
  validateURL,
  valueWithSlash
} from '../../utils';
import DeleteModal from '../DeleteModal';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';
import Input from '../UI/Input';

const WpPageSelection = () => {
  const { state, dispatch, asyncDispatch } = useWizard();
  const {
    step,
    platformSettings: { PLATFORM_PAGES },
    previewAgentId,
    customizations,
    selectedPlatformPages,
    isSavePlatformAgentPagesLoading,
    isPageSaveDisabled,
    isDeletePlatformAgentLoading,
    selectedAvatar,
    themeCustomizations
  } = state;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(isSavePlatformAgentPagesLoading);

  const [isAllSelected, setIsAllSelected] = useState(false);
  const [customUrlInputVal, setCustomUrlInputVal] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const [isCustomUrlSelected, setIsCustomUrlSelected] = useState(false);

  const [platformPages, setPlatformPages] = useState([]);

  // so called loader
  useEffect(() => {
    if (isSavePlatformAgentPagesLoading) {
      setIsSaveLoading(true);
    }
    const timer = setTimeout(() => {
      setIsSaveLoading(false);
    }, 1000);
    return () => { clearTimeout(timer); };
  }, [isSavePlatformAgentPagesLoading]);

  useEffect(() => {
    initAgent({
      agentId: previewAgentId, customizations, customAvatarUrl: selectedAvatar.avatarIconLink, ...themeCustomizations
    });
  }, [previewAgentId, customizations, selectedAvatar, themeCustomizations]);

  useEffect(() => {
    dispatch(ACTION_CREATORS.setWpPageSelectionSeen());
    saveInstallment(`${toCamelCase(step)}Step`);
  }, []);

  const normalizePages = pages => pages.map(({ text, value, selected }) => ({
    text,
    value,
    name: text === 'Entire Website' ? 'all' : toCamelCase(text),
    isChecked: selected === '1',
    isDisabled: false
  }));

  useEffect(() => {
    if (!PLATFORM_PAGES.length) return;
    setPlatformPages(normalizePages(PLATFORM_PAGES));
  }, [PLATFORM_PAGES]);

  // init state
  useEffect(() => {
    const customUrlPage = platformPages.find(page => page.name === 'customUrl' && page.value !== '');
    const allPage = platformPages.find(page => page.name === 'all');
    if (customUrlPage) {
      setCustomUrlInputVal(getPath(customUrlPage.value));
      setIsCustomUrlSelected(customUrlPage.isChecked);
    }
    if (allPage) {
      setIsAllSelected(allPage.isChecked);
    }
  }, [platformPages]);

  useEffectIgnoreFirst(() => {
    setPlatformPages((prevItems) => prevItems.map((page) => ({
      ...page,
      isChecked: page.name === 'customUrl' ? false : isAllSelected,
      isDisabled: page.name === 'all' ? false : isAllSelected
    })));
  }, [isAllSelected]);

  useEffectIgnoreFirst(() => {
    setPlatformPages((prevItems) => prevItems.map((page) => ({
      ...page,
      isChecked: isCustomUrlSelected && page.name === 'customUrl',
      isDisabled: isCustomUrlSelected && page.name !== 'customUrl'
    })));
    if (!isCustomUrlSelected) {
      setIsInputValid(true);
    }
  }, [isCustomUrlSelected]);

  // update selected pages
  useEffect(() => {
    let selectedPages = [];
    const isCustomUrl = platformPages.find(page => page.name === 'customUrl' && page.isChecked);
    const isAllPage = platformPages.find(page => page.name === 'all' && page.isChecked);
    if (isCustomUrl && isInputValid) {
      selectedPages = [`${window.location.origin}${customUrlInputVal}`];
    } else if (isAllPage) {
      selectedPages = [isAllPage.value];
    } else {
      selectedPages = platformPages.filter(page => page.name !== 'customUrl' && page.name !== 'all' && page.isChecked).map(page => page.value);
    }
    dispatch(ACTION_CREATORS.setSelectedPages(selectedPages));
  }, [platformPages, customUrlInputVal]);

  const handleChange = ({ name, isChecked }) => {
    setPlatformPages((prevItems) => prevItems.map((page) => {
      if (page.name !== name) return page;
      return {
        ...page,
        isChecked: !page.isChecked
      };
    }));
    if (name === 'all') {
      setIsAllSelected(!isChecked);
    }
    if (name === 'customUrl') {
      setIsCustomUrlSelected(!isChecked);
    }
    dispatch(ACTION_CREATORS.setPageSaveDisabled(false));
  };

  const validateInput = input => {
    if (input === '') {
      setIsInputValid(false);
      return false;
    }
    setIsInputValid(true);
    return true;
  };

  const handleCustomUrlInputChange = e => {
    const { value } = e.target;
    if (isPageSaveDisabled) {
      dispatch(ACTION_CREATORS.setPageSaveDisabled(false));
    }
    validateInput(value);
    if (validateURL(value)) {
      setCustomUrlInputVal(getPath(value));
    } else {
      setCustomUrlInputVal(valueWithSlash(value));
    }
  };

  const handleSaveWpPageChanges = async () => {
    saveInstallment(`saveWpPageChangesButton_${toCamelCase(step)}Step`);
    const pagesData = { action: 'update', key: 'pages', value: selectedPlatformPages.join(',') };
    await asyncDispatch(
      () => interactWithPlatform(pagesData),
      ACTION_CREATORS.savePlatformAgentPagesRequest,
      ACTION_CREATORS.savePlatformAgentPagesSuccess,
      ACTION_CREATORS.savePlatformAgentPagesError
    );
  };

  const handleDeleteWpChatbot = async () => {
    saveInstallment(`${DELETE_INST_NAME}_${toCamelCase(step)}Step`);
    const data = { action: 'delete' };
    await asyncDispatch(
      () => interactWithPlatform(data),
      ACTION_CREATORS.deletePlatformAgentRequest,
      ACTION_CREATORS.deletePlatformAgentSuccess,
      ACTION_CREATORS.deletePlatformAgentError
    );
    setIsDeleteModalOpen(false);
  };

  const filteredPlatformPages = platformPages.filter(page => (isAllSelected ? page.name !== 'customUrl' : page));

  return (
    <>
      <div className='jfpContent-wrapper--title'>
        <h2>{t(ALL_TEXTS.SHOW_AI_CHATBOT_ON)}</h2>
        <p>{t(ALL_TEXTS.CHOOSE_PAGES_THE_AI_CHATBOT_WILL_BE_SHOWN_ON)}</p>
      </div>
      <div className='jfpContent-wrapper--wp-page'>
        <ul id='wpPageSelection' className='jfpContent-wrapper--wp-page-list'>
          {filteredPlatformPages.map(item => (
            <li key={item.value} className='jfpContent-wrapper--wp-page-list-item'>
              <Checkbox
                size='small'
                label={item.text}
                checked={item.isChecked}
                disabled={item.isDisabled}
                onChange={() => handleChange(item)}
              />
              {item.name === 'customUrl' && isCustomUrlSelected && (
                <Input
                  prefix={window.location.origin}
                  value={customUrlInputVal}
                  onChange={e => handleCustomUrlInputChange(e)}
                />
              )}
              {item.name === 'customUrl' && isCustomUrlSelected && !isInputValid && <span className='jfInput--prefix-error'>*Cannot be empty</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className='jfpContent-wrapper--actions'>
        {/* delete wp chatbot */}
        <Button
          variant='ghost'
          loader={isDeletePlatformAgentLoading}
          onClick={() => setIsDeleteModalOpen(true)}
          colorStyle='error'
        >
          {isMobile() ? t(ALL_TEXTS.DELETE) : t(ALL_TEXTS.DELETE_AI_CHATBOT)}
        </Button>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onDeleteClick={handleDeleteWpChatbot}
          onCloseClick={() => setIsDeleteModalOpen(false)}
        />
        {/* save wp page selections changes */}
        <Button
          loader={isSaveLoading}
          onClick={handleSaveWpPageChanges}
          disabled={isPageSaveDisabled || isSavePlatformAgentPagesLoading || (isCustomUrlSelected && !isInputValid)}
        >
          {isSaveLoading && t(ALL_TEXTS.SAVED)}
          {!isSaveLoading && (isMobile() ? t(ALL_TEXTS.SAVE) : t(ALL_TEXTS.SAVE_CHANGES))}
        </Button>
      </div>
    </>
  );
};

export default WpPageSelection;

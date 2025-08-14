import React, { useEffect, useState } from 'react';
import {
  array, bool, func, string
} from 'prop-types';

import { ALL_TEXTS } from '../../constants';
import Button from '../UI/Button';
import { IconAIColor, IconPlusSquareFilled } from '../UI/Icon';
import MaterialListItem from './MaterialListItem';

const MaterialList = ({
  materials,
  isLoadingMaterials = false,
  editingMaterialID = '',
  setEditingMaterialId,
  // onEditClick,
  setMaterialType,
  onDeleteClick,
  setStep
}) => {
  const [showBadge, setShowBadge] = useState(true);

  useEffect(() => {
    if (materials?.length <= 0 && showBadge) {
      setShowBadge(false);
    }
  }, [materials, showBadge]);

  const handleEditClick = (materialId) => {
    setEditingMaterialId(materialId);
  };

  //  ISO 8601 format for Safari
  const parseDate = (dateStr) => new Date(dateStr.replace(' ', 'T'));

  const sortByUpdatedAt = (items, order = 'desc') => [...items].sort((a, b) => {
    const dateA = parseDate(a.updated_at)?.getTime();
    const dateB = parseDate(b.updated_at)?.getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <>
      {showBadge && (
        <div className='trained-knowledge'>
          <div className='trained-knowledge-content'>
            <div className='trained-knowledge-content-icon'>
              <IconAIColor />
            </div>
            <h3 className='trained-knowledge-content-title'>{ALL_TEXTS.AUTO_TRAINED_KNOWLEDGE}</h3>
          </div>
          <p className='trained-knowledge-desc'>{ALL_TEXTS.YOUR_AI_CHATBOT_IS_AUTOMATICALLY_TRAINED}</p>
        </div>
      )}
      <Button
        startIcon={<IconPlusSquareFilled />}
        onClick={() => {
          setMaterialType('TEXT');
          setStep('editor');
          // setStep('select')
        }}
        disabled={isLoadingMaterials}
        fullWidth
      >
        Add new knowledge
      </Button>
      {sortByUpdatedAt(materials).map((material) => (
        <MaterialListItem
          key={material.uuid}
          material={material}
          onEditClick={handleEditClick}
          onDeleteClick={onDeleteClick}
          editingMaterialID={editingMaterialID}
        />
      ))}
    </>
  );
};

export default MaterialList;

MaterialList.propTypes = {
  materials: array,
  isLoadingMaterials: bool,
  editingMaterialID: string,
  setEditingMaterialId: func,
  setStep: func,
  // onEditClick: func,
  onDeleteClick: func,
  setMaterialType: func
};

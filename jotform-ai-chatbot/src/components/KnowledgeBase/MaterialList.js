import React from 'react';
import {
  array, bool, func, string
} from 'prop-types';

import Button from '../UI/Button';
import { IconPlusSquareFilled } from '../UI/Icon';
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
  const handleEditClick = (materialId) => {
    setEditingMaterialId(materialId);
  };

  return (
    <>
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
      {materials.map((material) => (
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

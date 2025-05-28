import React, { useEffect } from 'react';
import { func } from 'prop-types';

import {
  addMaterial, bulkDeleteMaterial, deleteMaterial, saveInstallment, updateMaterial
} from '../../api';
import { ALL_TEXTS, STEPS } from '../../constants';
import { useWizard } from '../../hooks';
import { ACTION_CREATORS } from '../../store';
import { t, toCamelCase } from '../../utils';
import BackButton from '../BackButton';
import { KnowledgeBase } from '../KnowledgeBase';
import NextButton from '../NextButton';
import Button from '../UI/Button';
import { IconArrowRight } from '../UI/Icon';

const KnowledgeStep = ({ savePlatformAgentEmbed = f => f }) => {
  const {
    state, dispatch, asyncDispatch
  } = useWizard();

  const {
    step,
    materials,
    previewAgentId,
    isWpPageSelectionSeen,
    isSavePlatformAgentEmbedLoading,
    platformSettings: { PROVIDER_API_URL, PROVIDER_API_KEY }
  } = state;

  useEffect(() => {
    saveInstallment(`${toCamelCase(step)}Step`);
  }, []);

  const handleAdd = async newMaterial => {
    await asyncDispatch(
      () => addMaterial(previewAgentId, newMaterial, PROVIDER_API_KEY),
      ACTION_CREATORS.addMaterialRequest,
      ACTION_CREATORS.addMaterialSuccess,
      ACTION_CREATORS.addMaterialError
    );
  };

  const handleEdit = async (materialId, updatedMaterialData) => {
    await asyncDispatch(
      () => updateMaterial(previewAgentId, materialId, updatedMaterialData, PROVIDER_API_KEY),
      ACTION_CREATORS.updateMaterialRequest,
      ACTION_CREATORS.updateMaterialSuccess,
      ACTION_CREATORS.updateMaterialError
    );
  };

  const handleDelete = async materialId => {
    await asyncDispatch(
      () => deleteMaterial(previewAgentId, materialId, PROVIDER_API_KEY),
      ACTION_CREATORS.deleteMaterialRequest,
      ACTION_CREATORS.deleteMaterialSuccess,
      ACTION_CREATORS.deleteMaterialError,
      materialId
    );
  };

  const handleBulkDelete = async materialIds => {
    await asyncDispatch(
      () => bulkDeleteMaterial(previewAgentId, materialIds, PROVIDER_API_KEY),
      ACTION_CREATORS.bulkDeleteMaterialRequest,
      ACTION_CREATORS.bulkDeleteMaterialSuccess,
      ACTION_CREATORS.bulkDeleteMaterialError,
      materialIds
    );
  };

  const handleAddToMyWebsite = async () => {
    saveInstallment(`addToMyWebsiteButton_${toCamelCase(step)}Step`);
    await savePlatformAgentEmbed();
    dispatch(ACTION_CREATORS.setStep(STEPS.WP_PAGE_SELECTION));
  };

  return (
    <>
      <div className='content-wrapper--knowledge' data-js='knowledge-scroll-container'>
        <KnowledgeBase
          materials={materials}
          requestBaseURL={PROVIDER_API_URL}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleBulkDelete={handleBulkDelete}
        />
      </div>
      <div className='content-wrapper--actions'>
        <BackButton />
        <NextButton />
        {/* add to my website button */}
        <Button
          endIcon={isWpPageSelectionSeen && <IconArrowRight />}
          loader={isSavePlatformAgentEmbedLoading}
          onClick={handleAddToMyWebsite}
        >
          {!isWpPageSelectionSeen ? t(ALL_TEXTS.ADD_TO_MY_WEBSITE) : t(ALL_TEXTS.NEXT)}
        </Button>
      </div>
    </>
  );
};

export default KnowledgeStep;

KnowledgeStep.propTypes = {
  savePlatformAgentEmbed: func
};

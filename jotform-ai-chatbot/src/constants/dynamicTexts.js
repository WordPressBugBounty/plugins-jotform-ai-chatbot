import { createInterpolateElement } from '@wordpress/element';

const { _n = f => f, sprintf = f => f } = window.wp?.i18n || {};

export const DYNAMIC_TEXTS = {
  SHOWING_OF_CONVERSATIONS: (shownCount, totalCount) => {
    const template = _n(
      'Showing <shown>%1$s</shown> of <total>%2$s</total> conversation',
      'Showing <shown>%1$s</shown> of <total>%2$s</total> conversations',
      totalCount,
      'jotform-ai-chatbot'
    );

    const textWithTags = sprintf(template, shownCount, totalCount);

    return createInterpolateElement(textWithTags, {
      shown: <span className='jf-shown-count' />,
      total: <span className='jf-total-count' />
    });
  }
};

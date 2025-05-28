import React from 'react';
import cx from 'classnames';
import { func, string } from 'prop-types';

import { t } from '../../utils';

const Tab = ({ label, isActive, onClick }) => (
  <button
    type='button'
    className={cx('tab-button', { isActive })}
    onClick={onClick}
  >
    {t(label)}
  </button>
);

Tab.propTypes = {
  label: string.isRequired,
  isActive: string.isRequired,
  onClick: func.isRequired
};

export default Tab;

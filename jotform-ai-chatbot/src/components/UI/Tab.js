import React from 'react';
import cx from 'classnames';
import { bool, func, string } from 'prop-types';

const Tab = ({
  label, isActive, onClick, ariaSelected
}) => (
  <button
    type='button'
    className={cx('tab-button', { isActive })}
    onClick={onClick}
    role='tab'
    aria-selected={ariaSelected}
  >
    {label}
  </button>
);

Tab.propTypes = {
  label: string.isRequired,
  isActive: string.isRequired,
  onClick: func.isRequired,
  ariaSelected: bool
};

export default Tab;

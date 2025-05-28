import React from 'react';
import classNames from 'classnames';
import {
  bool, func, node, object, oneOf, string
} from 'prop-types';

import '../../styles/button.scss';

const Button = ({
  startIcon,
  endIcon,
  size = 'medium',
  children = null,
  variant = 'default',
  colorStyle = 'primary',
  onClick = f => f,
  loader = false,
  rounded = false,
  className = '',
  buttonRef = null,
  fullWidth = false,
  href = '',
  ...props
}) => {
  const buttonClass = classNames(
    'jfButton',
    `jfButton--${variant}`,
    `jfButton--${colorStyle}`,
    `jfButton--${size}`,
    {
      'jfButton--loading': loader,
      'jfButton--rounded': rounded,
      'jfButton--full-width': fullWidth
    },
    className
  );

  const content = (
    <>
      {loader && <span className='jfButton--spin' />}
      {startIcon && <span className='jfButton--icon'>{startIcon}</span>}
      {children && <span className='jfButton--text'>{children}</span>}
      {endIcon && <span className='jfButton--icon'>{endIcon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={buttonClass}
        onClick={onClick}
        ref={buttonRef}
        {...props}
        role='button'
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type='button'
      className={buttonClass}
      onClick={onClick}
      disabled={loader}
      ref={buttonRef}
      {...props}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  children: node,
  variant: oneOf(['default', 'ghost', 'filled', 'outline']),
  colorStyle: oneOf(['error', 'primary', 'success', 'teams', 'pdf', 'apps', 'reports', 'forms', 'sign', 'tables', 'inbox', 'approvals', 'analytics', 'pages', 'secondary', 'neutral']),
  onClick: func,
  startIcon: node,
  endIcon: node,
  loader: bool,
  size: oneOf(['small', 'medium', 'large']),
  rounded: bool,
  className: string,
  buttonRef: object,
  fullWidth: bool,
  href: string
};

export default Button;

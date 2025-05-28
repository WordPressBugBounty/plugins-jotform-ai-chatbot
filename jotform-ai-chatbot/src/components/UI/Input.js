import React, { forwardRef } from 'react';
import { string } from 'prop-types';

import '../../styles/input.scss';

const Input = forwardRef(({ prefix, ...props }, ref) => (
  <div className={`jfInput ${prefix && 'jfInput--prefix'}`}>
    {prefix && <span className='jfInput--prefix-text'>{prefix}</span> }
    <input {...props} ref={ref} />
  </div>
));

Input.defaultProps = {
  prefix: ''
};

Input.propTypes = {
  prefix: string
};

export default Input;

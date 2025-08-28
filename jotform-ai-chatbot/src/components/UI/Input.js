import React, { forwardRef, useEffect, useState } from 'react';
import { func, number, string } from 'prop-types';

import '../../styles/input.scss';

const Input = forwardRef(({
  maxLength, onChange = f => f, prefix = '', value = '', ...props
}, ref) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!maxLength) return;
    setCount(value?.length);
  }, [value, maxLength]);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    if (maxLength) {
      setCount(e.target.value.length);
    }
  };

  const PrefixTag = prefix?.as || null;

  return (
    <div className='jfInput'>
      {PrefixTag && (
        <PrefixTag className='jfInput--prefix'>
          {prefix.icon && <span className='jfInput--prefix-icon'>{prefix.icon}</span>}
          {prefix.text && <span className='jfInput--prefix-text'>{prefix.text}</span>}
        </PrefixTag>
      )}
      <input
        ref={ref}
        {...props}
        {...(value && { value })}
        maxLength={maxLength}
        onChange={handleChange}
      />
      {maxLength && (
        <div className='jfInput--counter'>
          {`${count} / ${maxLength}`}
        </div>
      )}
    </div>
  );
});

Input.defaultProps = {
  prefix: ''
};

Input.propTypes = {
  value: string,
  maxLength: number,
  onChange: func,
  prefix: string
};

export default Input;

import { useState } from 'react';
import './formInput.css';

const FormInput = (props: any) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (event: React.FormEvent) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => setFocused(true)}
        focused={focused.toString()}
      />
      <span className="helper">{errorMessage}</span>
    </div>
  );
};

export default FormInput;

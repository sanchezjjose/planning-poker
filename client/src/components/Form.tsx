import React from 'react';

import './Form.css';

function Form({ onSubmit, onChange, buttonText, placeholderText, value }: any) {
  return (
    <form className='Form' onSubmit={onSubmit}>
      <button type='submit'>{buttonText}</button>
      <input onChange={onChange} type='text' placeholder={placeholderText} value={value} />
    </form>
  );
}

export default Form;

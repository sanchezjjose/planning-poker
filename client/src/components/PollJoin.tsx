import React, { SyntheticEvent, useState } from 'react';
import { PollFormProps } from '../types/types';
import Form from './Form';

import './PollJoin.css';

function PollJoinForm({ setVoterName, setJoined }: PollFormProps) {
  const [name, setName] = useState<string>('');

  function handleNameSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (name) {
      setVoterName(name);
      setJoined(true);
    }
  }

  function handleNameChange(e: SyntheticEvent) {
    const value = (e.target as HTMLInputElement).value;
    setName(value);
  }

  return (
    <div className='PollJoin'>
      <Form
        onSubmit={handleNameSubmit}
        onChange={handleNameChange}
        buttonText='Join'
        placeholderText='Your Name'
        value={name} />
    </div>
  );
}

export default PollJoinForm;

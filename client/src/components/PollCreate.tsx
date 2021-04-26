import React, { SyntheticEvent, useState } from 'react';

import { createPollAPI } from '../api/routes';
import { Poll, PollCreateProps } from '../types/types';
import Form from './Form';

import './PollCreate.css';

function PollCreate({ updatePolls }: PollCreateProps) {
  const [name, setName] = useState<string>('');

  function handleNameChange(e: SyntheticEvent) {
    let value = (e.target as HTMLInputElement).value;
    setName(value);
  }

  async function handleCreatePoll(e: SyntheticEvent) {
    e.preventDefault();

    if (name) {
      const id = name.split(' ').join('-').toLowerCase();
      const response = await fetch(createPollAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name })
      });

      if (!response.ok) {
        const { error } = await response.json();
        return alert(error);
      }

      const polls: Poll[] = await response.json();

      setName('');
      updatePolls(polls);

    } else {
      // TODO: Display validation errors
    }
  }

  return (
    <div className='PollCreate'>
      <Form
        onSubmit={handleCreatePoll}
        onChange={handleNameChange}
        buttonText='+'
        placeholderText='Enter Poll Name'
        value={name} />
    </div>
  );
}

export default PollCreate;

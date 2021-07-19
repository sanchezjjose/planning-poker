import React, { SyntheticEvent, useEffect } from 'react';
import { PollVoteOptionsProps } from '../types/types';
import { points } from '../util/config';

import './PollVote.css';

function PollVote({ pollId, voterName, voteValue, setVoteValue, socket }: PollVoteOptionsProps) {
  function submitVote(e: SyntheticEvent) {
    const value = (e.target as HTMLButtonElement).dataset.point || '';
    setVoteValue(value);
  }

  useEffect(() => {
    if (pollId && voterName && voteValue !== '') {
      socket.emit('vote', pollId, voterName, voteValue);
    }
  }, [pollId, voterName, voteValue, socket]);

  return (
    <div className='PollVote'>
      <h1 className='Poll-greeting-header'>Welcome {voterName}!</h1>
      {points.map(point =>
        <button key={point} onClick={submitVote} data-point={point}>{point}</button>
      )}
    </div>
  );
}

export default PollVote;

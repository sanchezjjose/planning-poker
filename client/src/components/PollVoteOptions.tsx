import React, { SyntheticEvent, useEffect, useState } from 'react';
import { PollVoteOptionsProps } from '../types/types';
import { points } from '../util/config';

import './PollVoteOptions.css';

function PollVoteOptions({ pollId, voterName, socket }: PollVoteOptionsProps) {
  const [voteValue, setVoteValue] = useState<string>('');

  function submitVote(e: SyntheticEvent) {
    const value = (e.target as HTMLButtonElement).dataset.point || '';
    setVoteValue(value);
  }

  useEffect(() => {
    if (pollId && voterName && voteValue) {
      socket.emit('vote', pollId, voterName, voteValue);
    }
  }, [voterName, pollId, voteValue, socket]);

  return (
    <div className='PollVoteOptions'>
      {points.map(point =>
        <button key={point} onClick={submitVote} data-point={point}>{point}</button>
      )}
    </div>
  );
}

export default PollVoteOptions;

import React from 'react';
import { PollActionsProps } from '../types/types';

import './PollActions.css';

function PollActions({ poll, setPoll, socket }: PollActionsProps) {

  function clearVotes() {
    const pollCopy = { ...poll, votes: [] };
    setPoll(pollCopy);
    socket.emit('votes-clear', pollCopy.id, pollCopy.name);
  }

  function reveal() {
    alert('WIP');
  }

  return (
    <div className='PollActions'>
        {poll.votes.length > 0 && (
            <>
                <button onClick={clearVotes}>Clear</button>
                <button onClick={reveal}>Reveal</button>
            </>
        )}
    </div>
  );
}

export default PollActions;

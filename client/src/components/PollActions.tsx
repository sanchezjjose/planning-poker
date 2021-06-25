import React from 'react';
import { PollActionsProps } from '../types/types';

import './PollActions.css';

function PollActions({ socket, poll, setPoll }: PollActionsProps) {

  function clearVotes() {
    const pollCopy = { ...poll, votes: [] };
    setPoll(pollCopy);
    socket.emit('votes-clear', pollCopy.id, pollCopy.name);
  }

  function reveal() {
    socket.emit('votes-reveal', true);
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

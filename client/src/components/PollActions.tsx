import React from 'react';
import { PollActionsProps } from '../types/types';

import './PollActions.css';

function PollActions({ socket, poll, setPoll }: PollActionsProps) {

  function clearVotes() {
    const pollCopy = { ...poll, votes: [] };
    setPoll(pollCopy);
    socket.emit('votes-clear', pollCopy.id, pollCopy.name);
  }

  function peekVotes() {
    socket.emit('votes-reveal', true);
    setTimeout(() => {
        socket.emit('votes-reveal', false);
    }, 100);
  }

  function reveal() {
    socket.emit('votes-reveal', true);
  }

  return (
    <div className='PollActions'>
        {poll.votes.length > 0 && (
            <>
                <button className='button-peek poll-actions-button' onClick={peekVotes}>Peek</button>
                <button className='button-clear poll-actions-button' onClick={clearVotes}>Clear</button>
                <button className='button-reveal poll-actions-button' onClick={reveal}>Reveal</button>
            </>
        )}
    </div>
  );
}

export default PollActions;

import React from 'react';
import { PollActionsProps } from '../types/types';

import './PollActions.css';

function PollActions({ socket, poll, setPoll, setReveal }: PollActionsProps) {

  function clearVotes() {
    const pollCopy = { ...poll, votes: [] };
    setPoll(pollCopy);
    socket.emit('votes-clear', pollCopy.id, pollCopy.name);
  }

  function peekVotes() {
    setReveal(true)
    setTimeout(() => { setReveal(false) }, 100);
  }

  function revealVotes() {
    socket.emit('votes-reveal', true);
  }

  return (
    <div className='PollActions'>
      {poll.votes.length > 0 && (
        <>
          <button className='button-peek poll-actions-button' onClick={peekVotes}>Peek</button>
          <button className='button-clear poll-actions-button' onClick={clearVotes}>Clear</button>
          <button className='button-reveal poll-actions-button' onClick={revealVotes}>Reveal</button>
        </>
      )}
    </div>
  );
}

export default PollActions;

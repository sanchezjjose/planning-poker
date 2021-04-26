import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from "socket.io-client";

import { getPollAPI } from '../api/routes';
import { endpoint } from '../util/config';
import { Poll } from '../types/types';

import PollJoin from './PollJoin';
import PollVote from './PollVote';
import PollVotes from './PollVotes';

import './Poll.css';

const socket = io(endpoint, { secure: true, transports: ['websocket'] });

function PollComponent() {
  const pollId = window.location.pathname.split('/')[1];

  const [voterName, setVoterName] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);
  const [poll, setPoll] = useState<Poll>({ id: pollId, name: '', votes: [] });

  useEffect(() => {
    async function getVotes() {
      const response = await fetch(getPollAPI(pollId));

      if (response.ok) {
        const poll: Poll = await response.json();
        setPoll(poll);

        socket.on('poll-updated', (poll: Poll) => {
          setPoll(poll);
        });

      } else {
        window.location.href = '/';
      }
    }

    getVotes();

    return () => {
      socket.off('poll-updated');
    };

  }, [pollId]);

  return (
    <div className='Poll'>
      <header className='Poll-header header'>
        <Link className='Poll-header-back-link' to={`/`}></Link>
        <h1>Planning Poker</h1>
      </header>
      <header className='Poll-sub-heading'>
        <h2>{poll.name}</h2>
      </header>
      <div className='Poll-content'>
        {joined ?
          <div>
            <h1 className='Poll-greeting-header'>Welcome {voterName}!</h1>
            <PollVote pollId={poll.id} voterName={voterName} socket={socket} />
          </div> :
          <PollJoin setVoterName={setVoterName} setJoined={setJoined} />
        }
        <PollVotes votes={poll.votes} />
      </div>
    </div >
  );
}

export default PollComponent;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from "socket.io-client";

import { getPollAPI } from '../api/routes';
import { endpoint } from '../util/config';
import { Poll } from '../types/types';

import PollActions from './PollActions';
import PollJoin from './PollJoin';
import PollVote from './PollVote';
import PollVotes from './PollVotes';
import Celebration from './Celebration';

import './Poll.css';

const socket = io(endpoint, { secure: true });

function PollComponent() {
  const pollId = window.location.pathname.split('/')[1];

  const [voterName, setVoterName] = useState<string>('');
  const [voteValue, setVoteValue] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);
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

        socket.on('poll-reveal-votes', (revealVotes: boolean) => {
          setReveal(revealVotes);
        });

        socket.on('poll-cleared', (poll: Poll) => {
          // TODO: Look into atomic updates with React 18
          setVoteValue('');
          setReveal(false);
          setPoll(poll);
        });

      } else {
        // TODO: redirect with React Router
        window.location.href = '/';
      }
    }

    getVotes();

    return () => {
      socket.off('poll-updated');
      socket.off('poll-reveal-votes');
      socket.off('poll-cleared');
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
          <PollVote
            pollId={poll.id}
            voterName={voterName}
            voteValue={voteValue}
            setVoteValue={setVoteValue}
            socket={socket} /> :
          <PollJoin
            setVoterName={setVoterName}
            setJoined={setJoined} />
        }
        <PollActions poll={poll} setPoll={setPoll} setReveal={setReveal} socket={socket} />
        <PollVotes votes={poll.votes} reveal={reveal} />
        <Celebration reveal={reveal} />
      </div>
    </div>
  );
}

export default PollComponent;

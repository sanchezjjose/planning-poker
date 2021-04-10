import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getPollsAPI } from '../api/routes';
import { Poll } from '../types/types';
import CreatePoll from './CreatePoll';

import './Landing.css';

function Landing() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    async function getPolls() {
      const response = await fetch(getPollsAPI);

      if (response.ok) {
        const polls: Poll[] = await response.json();
        setPolls(polls);
      }
    }

    getPolls();

  }, []);

  return (
    <div className='Landing'>
      <header className='Landing-header header'>
        <h1>Planning Poker</h1>
      </header>
      <CreatePoll updatePolls={setPolls} />
      <h2 className='Landing-sub-heading'>Polls</h2>
      <div className='Landing-content'>
        <ul className='Landing-polls-list'>
          {polls.map(poll =>
            <li className='Landing-poll-link' key={poll.id}>
              <Link to={`/${poll.id}`}>{poll.name}</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Landing;

import React from 'react';
import { PollVotesProps } from '../types/types';

import './PollVotes.css';

function PollVotes({ votes, reveal }: PollVotesProps) {
  return (
    <div className='PollVotes'>
      <div className='PollVotes-cards' data-num-cards={votes.length}>
        {votes.map((vote, i) =>
          <div key={i} className='PollVotes-card'>
            <p className='PollVotes-card-point'>
              {reveal ? vote.voteValue : '?' }
            </p>
            <p className='PollVotes-card-name'>
              {vote.voterName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PollVotes;

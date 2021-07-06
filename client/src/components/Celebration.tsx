import React, { useEffect, useState, AnimationEvent } from 'react';

import { CelebrationProps } from '../types/types';
import celebrationImage from '../images/celebration.png';

import './Celebration.css';

function Celebration ({ reveal }: CelebrationProps) {
  const [celebrate, setCelebrate] = useState<boolean>(false);

  useEffect(() => {
    function shouldCelebrate(votes: String[]) {
      return votes.length > 1
        && votes[0] !== '?'
        && votes.every(vote => vote === votes[0]);
    }

    const voteElements: Element[] = Array.from(document.querySelectorAll('.PollVotes-card-point'));
    const votes: String[] = voteElements.map(el => el.textContent || '');
    const celebrationTime = shouldCelebrate(votes);
    setCelebrate(celebrationTime);
  
  }, [reveal]);

  // TODO: cleanup / remove event listeners
  function listener(event: AnimationEvent<HTMLImageElement>) {
    switch(event.type) {
      case 'animationstart':
        console.log(`Started: elapsed time is ${event.elapsedTime}`);
        break;
      case 'animationend':
        setCelebrate(false);
        console.log(`Ended: elapsed time is ${event.elapsedTime}`);
        break;
      case 'animationiteration':
        console.log(`New loop started at time ${event.elapsedTime}`);
        break;
    }
  }

  return (
    <img 
      className={`Celebration ${celebrate ? 'show slidein' : ''}`}
      src={celebrationImage}
      alt='Celebration'
      onAnimationStart={listener}
      onAnimationEnd={listener}
      onAnimationIteration={listener}
      width='240px'
      height='300px' />
  );
}

export default Celebration;

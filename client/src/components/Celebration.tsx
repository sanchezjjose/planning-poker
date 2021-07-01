import React, { useEffect, useState, AnimationEvent } from 'react';

import { CelebrationProps } from '../types/types';
import celebrationImage from '../images/celebration.png';

import './Celebration.css';

function Celebration ({ reveal }: CelebrationProps) {
  const [celebrate, setCelebrate] = useState<boolean>(false);

  useEffect(() => {
    const voteValueElements: Element[] = Array.from(document.querySelectorAll('.PollVotes-card-point'));
    const voteValues = voteValueElements.map(el => el.textContent);
  
    if (voteValues.length > 1) {
      const shouldCelebrate = voteValues.every(val => val === voteValues[0]);
      setCelebrate(shouldCelebrate);
    }
  
  }, [reveal]);

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

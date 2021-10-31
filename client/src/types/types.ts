import { Socket } from 'socket.io-client';

export interface Vote {
  voterName: string,
  voteValue: string
}

export interface Poll {
  id: string,
  name: string
  votes: Vote[]
}

export interface PollFormProps {
  // handleNameSubmit: (e: SyntheticEvent, name: string) => void
  setVoterName: (name: string) => void
  setJoined: (joined: boolean) => void
}

export interface PollVoteOptionsProps {
  pollId: string,
  voterName: string,
  voteValue: string,
  setVoteValue: (vote: string) => void
  socket: Socket
}

export interface PollVotesProps {
  votes: Vote[],
  reveal: boolean
}

export interface PollActionsProps {
  poll: Poll,
  setPoll: (poll: Poll) => void,
  setReveal: (reveal: boolean) => void,
  socket: Socket
}

export interface PollCreateProps {
  updatePolls: (polls: Poll[]) => void
}

export interface CelebrationProps {
  reveal: boolean
}

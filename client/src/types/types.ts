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
  // setPoint: (point: string) => void
  voterName: string,
  pollId: string,
  socket: Socket
}

export interface PollVotesProps {
  votes: Vote[]
}

export interface PollCreateProps {
  updatePolls: (polls: Poll[]) => void
}

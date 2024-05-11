import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleNextClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const mostVotesIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>Votes: {votes[selected]}</div>
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleNextClick}>Next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {votes[mostVotesIndex] > 0 && <div>{anecdotes[mostVotesIndex]}</div>}
    </div>
  );
}

export default App;

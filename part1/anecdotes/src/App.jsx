import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

function findMaxVotesIndex(arr) {
  let max = Number.NEGATIVE_INFINITY;
  let maxIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    const number = arr[i];
    if (number > max) {
      maxIndex = i;
      max = number;
    }
  }
  return maxIndex;
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const selectAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length);

    if (randomIndex === selected) {
      randomIndex = (randomIndex + 1) % anecdotes.length;
    }
    setSelected(randomIndex);
  };

  const voteAnecdote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;

    console.log(votesCopy);
    setVotes(votesCopy);
  };

  const bestIndex = findMaxVotesIndex(votes);

  return (
    <>
      <div>
        <Header text={"Anecdote of the Day"} />
        {anecdotes[selected]}
      </div>
      <div>
        <br />
        <Button handleClick={voteAnecdote} text={"Vote"} />
        <Button handleClick={selectAnecdote} text={"Next Anecdote"} />
      </div>
      <div>
        <Header text={"Anecdote With Most Votes"} />
        <p>
          <b>
            This anecdote has been chosen as the best with {votes[bestIndex]}{" "}
            votes:
          </b>
        </p>
        <p>{anecdotes[bestIndex]}</p>
      </div>
    </>
  );
};

export default App;

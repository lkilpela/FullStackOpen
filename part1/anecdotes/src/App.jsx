import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Display = (props) => {
  return (
    <div>
      {props.text}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  // an array created with a len equal to number of elements in anecdores array,
  // filled each element with 0
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const onClick = () => {
    // generate a random index between 0 and length of anecdotes array
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex) // set the random index as selected
  }

  const voteAnecdote = () => {
    const copy = [...votes] // shallow copy of current votes array using spread operator ...
    copy[selected] += 1 // increment the vote of selected anecdote
    setVotes(copy) // update the votes array
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <br />
      <Display text={`has ${votes[selected]} votes`} />
      <Button onClick={voteAnecdote} text="vote" />
      <Button onClick={onClick} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      {anecdotes[votes.indexOf(Math.max(...votes))]}
      <br />
      <Display text={`has ${Math.max(...votes)} votes`} />
    </div>
  )
}

export default App
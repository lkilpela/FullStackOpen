import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

// Passing event handlers to child components
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <Header text='statistics' />
      {total > 0 ? (
        <table>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={average.toFixed(1)} />
          <StatisticLine text='positive' value={positive.toFixed(1) + '%'} />
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
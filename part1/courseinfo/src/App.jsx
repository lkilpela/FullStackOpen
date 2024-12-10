const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.parts.name} {props.parts.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} parts={part} />
      ))}
    </div>
  )
}

const sum = p => p[0].exercises + p[1].exercises + p[2].exercises


const Total = (props) => {
  const t = sum(props.parts)
  return (
    <div>
      <p>
        Number of exercises {t}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
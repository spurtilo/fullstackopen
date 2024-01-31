
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({ parts, exercises }) => {
  return (
    <>
    <Part partName={parts[0]} exerciseNumber={exercises[0]} />
    <Part partName={parts[1]} exerciseNumber={exercises[1]} />
    <Part partName={parts[2]} exerciseNumber={exercises[2]} />
    </>
  )
}

const Part = ({ partName, exerciseNumber }) => {
  return (
    <p>{partName} {exerciseNumber}</p>
  )
}

const Total = ({ exercises }) => {
  const sum = exercises.reduce((a, b) => a + b, 0)

  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const allParts = [part1, part2, part3]
  const allExercises = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header course={course} />
      <Content parts={allParts} exercises={allExercises} /> 
      <Total exercises={allExercises} />
    </div>
  )
}

export default App

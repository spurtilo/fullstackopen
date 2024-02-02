const Header = ({ courseInfo }) => {
  return <h1>{courseInfo.name}</h1>;
};

const Content = ({ courseInfo }) => {
  return (
    <>
      {courseInfo.parts.map((part, index) => (
        <Part
          key={index}
          partName={part.name}
          exerciseAmount={part.exercises}
        />
      ))}
    </>
  );
};

const Part = ({ partName, exerciseAmount }) => {
  return (
    <p>
      {partName} {exerciseAmount}
    </p>
  );
};

const Total = ({ courseInfo }) => {
  const total = courseInfo.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseInfo={course} />
      <Content courseInfo={course} />
      <Total courseInfo={course} />
    </div>
  );
};

export default App;

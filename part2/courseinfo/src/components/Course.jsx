const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ partName, exerciseAmount }) => {
  return (
    <p>
      {partName} {exerciseAmount}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part
          key={part.id}
          partName={part.name}
          exerciseAmount={part.exercises}
        />
      ))}
    </>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;

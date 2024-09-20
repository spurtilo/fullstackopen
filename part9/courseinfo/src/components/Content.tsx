import Part from './Part';
import { CoursePart } from './types';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => {
        return <Part key={part.name} part={part} />;
      })}
    </>
  );
};

export default Content;

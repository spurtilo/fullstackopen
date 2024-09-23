import { DiaryEntry } from '../types';

const Content = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <>
      <h3>Diary Entries</h3>
      {entries.map((entry) => {
        return (
          <div key={entry.id}>
            <h4>{entry.date} </h4>
            <p>Weather: {entry.weather}</p>
            <p>Visibility: {entry.visibility}</p>
            <p>Comment: {entry.comment}</p>
          </div>
        );
      })}
    </>
  );
};

export default Content;

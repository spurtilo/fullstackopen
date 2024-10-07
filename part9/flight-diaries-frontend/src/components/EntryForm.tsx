import { useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from '../types';

interface EntryFormProps {
  addEntry: (entryObject: NewDiaryEntry) => Promise<DiaryEntry | void>;
}

const EntryForm = ({ addEntry }: EntryFormProps) => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<string>('sunny');
  const [visibility, setVisibility] = useState<string>('great');
  const [comment, setComment] = useState<string>('');

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await addEntry({ date, weather, visibility, comment });
    setDate('');
    setWeather('sunny');
    setVisibility('great');
    setComment('');
  };

  return (
    <>
      <h3>Add New Entry</h3>
      <form onSubmit={entryCreation}>
        <div>
          <label>
            Date
            <input
              type="date"
              name="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Weather:
            <input
              type="radio"
              name="weatherFilter"
              onChange={() => {
                setWeather('sunny');
              }}
              checked={weather === 'sunny'}
            />
            sunny
            <input
              type="radio"
              name="weatherFilter"
              onChange={() => {
                setWeather('rainy');
              }}
              checked={weather === 'rainy'}
            />
            rainy
            <input
              type="radio"
              name="weatherFilter"
              onChange={() => {
                setWeather('cloudy');
              }}
              checked={weather === 'cloudy'}
            />
            cloudy
            <input
              type="radio"
              name="weatherFilter"
              onChange={() => {
                setWeather('stormy');
              }}
              checked={weather === 'stormy'}
            />
            stormy
            <input
              type="radio"
              name="weatherFilter"
              onChange={() => {
                setWeather('windy');
              }}
              checked={weather === 'windy'}
            />
            windy
          </label>
        </div>
        <div>
          <label>
            Visibility
            <input
              type="radio"
              name="visibilityFilter"
              onChange={() => {
                setVisibility('great');
              }}
              checked={visibility === 'great'}
            />
            great
            <input
              type="radio"
              name="visibilityFilter"
              onChange={() => {
                setVisibility('good');
              }}
              checked={visibility === 'good'}
            />
            good
            <input
              type="radio"
              name="visibilityFilter"
              onChange={() => {
                setVisibility('ok');
              }}
              checked={visibility === 'ok'}
            />
            ok
            <input
              type="radio"
              name="visibilityFilter"
              onChange={() => {
                setVisibility('poor');
              }}
              checked={visibility === 'poor'}
            />
            poor
          </label>
        </div>
        <div>
          <label>
            Comment
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default EntryForm;

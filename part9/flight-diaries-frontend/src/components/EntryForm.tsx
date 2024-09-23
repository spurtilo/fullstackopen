import { useState } from 'react';
import { EntryFormProps } from '../types';

const EntryForm = ({ addEntry }: EntryFormProps) => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const response = await addEntry({ date, weather, visibility, comment });
    if (!('error' in response)) {
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
    }
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
              placeholder="YYYY-MM-DD"
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
            />
            sunny
            <input
              type="radio"
              name="weatherFilter"
              onChange={() => {
                setWeather('rainy');
              }}
            />
            rainy
            <input
              type="radio"
              name="weatherFilter"
              onChange={() => {
                setWeather('cloudy');
              }}
            />
            cloudy
            <input
              type="radio"
              name="weatherFilter"
              onChange={() => {
                setWeather('stormy');
              }}
            />
            stormy
            <input
              type="radio"
              name="weatherFilter"
              onChange={() => {
                setWeather('windy');
              }}
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
            />
            great
            <input
              type="radio"
              name="visibilityFilter"
              onChange={() => {
                setVisibility('good');
              }}
            />
            good
            <input
              type="radio"
              name="visibilityFilter"
              onChange={() => {
                setVisibility('ok');
              }}
            />
            ok
            <input
              type="radio"
              name="visibilityFilter"
              onChange={() => {
                setVisibility('poor');
              }}
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

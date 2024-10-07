import { useState, useEffect } from 'react';
import axios from 'axios';

import diaryService from './services/diaryService';
import { DiaryEntry, NewDiaryEntry, ZodIssue } from './types';
import Content from './components/Content';
import EntryForm from './components/EntryForm';
import Notification from './components/Notification';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[] | []>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const returnedEntries: DiaryEntry[] =
          await diaryService.getAllEntries();
        const sortedEntries = returnedEntries.sort((a, b) => b.id - a.id);
        setEntries(sortedEntries);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.status);
          console.error(error.response);
        } else {
          console.error(error);
        }
      }
    };
    fetchEntries();
  }, []);

  const handleNotification = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(undefined);
    }, 4000);
  };

  const addEntry = async (
    entryObject: NewDiaryEntry
  ): Promise<DiaryEntry | void> => {
    try {
      const returnedEntry = await diaryService.createEntry(entryObject);
      const sortedEntries = [...entries, returnedEntry].sort(
        (a, b) => b.id - a.id
      );
      setEntries(sortedEntries);
      return returnedEntry;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data.error && Array.isArray(e?.response?.data.error)) {
          const firstError: ZodIssue = e?.response?.data.error[0];
          const message = `ERROR: ${firstError.message}`;
          console.error(message);
          handleNotification(message);
        } else {
          handleNotification('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        handleNotification('Unknown error');
      }
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      <Notification message={error} />
      <EntryForm addEntry={addEntry} />
      <Content entries={entries} />
    </div>
  );
}

export default App;

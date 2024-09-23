import { useState, useEffect } from 'react';
import axios from 'axios';

import diaryService from './services/diaryService';
import {
  DiaryEntry,
  NewDiaryEntry,
  NotificationProps,
  ZodIssue,
} from './types';
import Content from './components/Content';
import EntryForm from './components/EntryForm';
import Notification from './components/Notification';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[] | []>([]);
  const [notification, setNotification] = useState<NotificationProps>({
    messages: [],
  });

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

  const handleNotification = (messages: string[]) => {
    setNotification({ messages });
    setTimeout(() => {
      setNotification({ messages: [] });
    }, 6000);
  };

  const addEntry = async (
    entryObject: NewDiaryEntry
  ): Promise<DiaryEntry | { error: string }> => {
    try {
      const returnedEntry = await diaryService.createEntry(entryObject);
      const sortedEntries = [...entries, returnedEntry].sort(
        (a, b) => b.id - a.id
      );
      setEntries(sortedEntries);
      return returnedEntry;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        const errorArray: ZodIssue[] = error.response.data.error;
        const errorMessages = errorArray.map(
          (e) => `ERROR: ${e.path[0]} : ${e.message}`
        );
        console.log(errorMessages);
        handleNotification(errorMessages);
      } else {
        console.error(error);
      }
      return { error: 'Something went wrong' };
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      <Notification messages={notification.messages} />
      <EntryForm addEntry={addEntry} />
      <Content entries={entries} />
    </div>
  );
}

export default App;

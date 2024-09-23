export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface EntryFormProps {
  addEntry: (
    entryObject: NewDiaryEntry
  ) => Promise<DiaryEntry | { error: string }>;
}

export interface NotificationProps {
  messages: string[];
}

export interface ZodIssue {
  code: string;
  message: string;
  options?: string[];
  path: (string | number)[];
  received?: string;
}

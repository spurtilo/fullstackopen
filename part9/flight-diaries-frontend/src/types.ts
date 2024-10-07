export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface ZodIssue {
  code: string;
  message: string;
  options?: string[];
  path: (string | number)[];
  received?: string;
}

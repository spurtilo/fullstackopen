import diagnosisData from '../../data/diagnosisData';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  return diagnosisData;
};

export default {
  getEntries,
};

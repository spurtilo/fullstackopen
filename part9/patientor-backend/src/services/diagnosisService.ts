import diagnosisData from '../../data/diagnosisData';
import { DiagnosisEntry } from '../types';

const getEntries = (): DiagnosisEntry[] => {
  return diagnosisData;
};

export default {
  getEntries,
};

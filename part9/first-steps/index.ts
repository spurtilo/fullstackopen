/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
    return;
  }

  try {
    const bmi = calculateBmi(height, weight);
    res.json({
      height,
      weight,
      bmi,
    });
  } catch {
    res.status(500).json({ error: 'internal server error' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { target, dailyExercises }: any = req.body;

  if (!dailyExercises || !target) {
    res.status(422).json({
      error: 'parameters missing',
    });
    return;
  }

  const targetNumber = Number(target);
  const dailyNumbers = Array.isArray(dailyExercises)
    ? dailyExercises.map((d: unknown) => Number(d))
    : [];

  if (
    !Array.isArray(dailyExercises) ||
    dailyNumbers.some(isNaN) ||
    isNaN(targetNumber)
  ) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
    return;
  }

  try {
    const result = calculateExercises(targetNumber, dailyNumbers);
    res.json(result);
  } catch {
    res.status(500).json({ error: 'internal server error' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

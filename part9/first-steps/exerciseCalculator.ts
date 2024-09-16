interface ExerciseInputValues {
  targetNumber: number;
  hoursArray: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseInputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const userArgs = args.slice(2);
  const stringsToNumbers = userArgs.map((a) => Number(a));

  if (stringsToNumbers.some(isNaN)) {
    throw new Error('Some or all of the provided values were not numbers!');
  }

  const targetNumber = stringsToNumbers[0];
  const hoursArray = stringsToNumbers.slice(1);

  return {
    targetNumber,
    hoursArray,
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

export const calculateExercises = (
  targetAverageValue: number,
  dailyExercises: number[]
): Result => {
  const average =
    dailyExercises.reduce((total, daily) => total + daily, 0) /
    dailyExercises.length;

  let rating = 1;
  let ratingDescription =
    'Needs improvement. Your average hours are way below the target.';
  if (
    average >= targetAverageValue * 0.8 &&
    average <= targetAverageValue * 0.99
  ) {
    rating = 2;
    ratingDescription = 'Good job! Your average hours are close to the target.';
  } else if (average >= targetAverageValue) {
    rating = 3;
    ratingDescription =
      'Excellent! Your average hours meet or exceed the target.';
  }

  return {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter((day) => day !== 0).length,
    target: targetAverageValue,
    average,
    success: average >= targetAverageValue,
    rating,
    ratingDescription,
  };
};

if (require.main === module) {
  try {
    const { targetNumber, hoursArray } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(targetNumber, hoursArray));
  } catch (error) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

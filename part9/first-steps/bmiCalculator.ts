interface BmiInputValues {
  value1: number;
  value2: number;
}

const parseBmiArguments = (args: string[]): BmiInputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const value1 = Number(args[2]);
  const value2 = Number(args[3]);

  if (isNaN(value1) || isNaN(value2)) {
    throw new Error('Some or all of the provided values were not numbers.');
  }

  return { value1, value2 };
};

export const calculateBmi = (heightInCm: number, weightInKg: number) => {
  if (heightInCm === 0 || weightInKg === 0) {
    throw new Error('Height or weight cannot be zero.');
  }

  const heightInM = heightInCm / 100;
  const bmi = weightInKg / (heightInM * heightInM);

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi >= 17 && bmi <= 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal range';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (bmi >= 30 && bmi <= 34.9) {
    return 'Obese (Class I)';
  } else if (bmi >= 35 && bmi <= 39.9) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

if (require.main === module) {
  try {
    const { value1, value2 } = parseBmiArguments(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

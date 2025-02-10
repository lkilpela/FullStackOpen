import { isNotNumber } from './utils';

interface Result {
    periodLength: number;
    trainingDays: number;
    sucess: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArray = (args: Array<string>): Array<number> => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.slice(2).every(arg => !isNotNumber(arg))) {
        return args.slice(2).map(arg => Number(arg));
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercises = (dailyExerciseHours: Array<number>, targetAmount: number): Result => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(h => h > 0).length;
    const success = dailyExerciseHours.every(h => h >= targetAmount);
    const rating = success ? 3 : trainingDays >= targetAmount ? 2 : 1;
    const ratingDescription = rating === 3 ? 'Excellent job!' : rating === 2 ? 'Not too bad but could be better' : 'You should try harder';
    const target = targetAmount;
    const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;

    return {
        periodLength,
        trainingDays,
        sucess: success,
        rating,
        ratingDescription,
        target,
        average
    };
}

try {
    const dailyExerciseHours = parseArray(process.argv);
    const targetAmount = dailyExerciseHours.shift() as number;
    console.log(calculateExercises(dailyExerciseHours, targetAmount));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
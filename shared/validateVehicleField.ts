import { getYear } from 'date-fns';
import { ValidationResult, numeric } from './validation';

export const validateVehicleField = (key: string, value?: string): ValidationResult => {
    switch (key) {
        case 'year':
            const numericResult = numeric('year', value);
            if (!numericResult.errors) {
                const year = numericResult.validValue as number;
                const nextYear = getYear(new Date()) + 1;
                if (year > 1985 && year < nextYear) {
                    return numericResult;
                }
                return {
                    errors: { year: [`Year must be between 1985 and ${nextYear}`] },
                    validValue: undefined,
                };
            }
            return numericResult;
    }
    return { validValue: value };
};

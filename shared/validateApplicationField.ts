import { differenceInYears } from 'date-fns';
import { ValidationResult, numeric } from './validation';

export const validateApplicationField = (key: string, value?: string): ValidationResult => {
    switch (key) {
        case 'zipCode':
            return numeric('zipCode', value);
        case 'dateOfBirth':
            if (!value) return { validValue: value };
            console.log(typeof value);
            const timestamp = Date.parse(value);
            if (Number.isNaN(timestamp)) {
                return {
                    validValue: undefined,
                    errors: { dateOfBirth: ['dateOfBirth is not valid'] },
                };
            }
            const yearDiff = differenceInYears(new Date(), new Date(value));
            if (yearDiff < 16) {
                return {
                    validValue: undefined,
                    errors: { dateOfBirth: ['dateOfBirth is less than 16 years ago'] },
                };
            }
    }
    return { validValue: value };
};

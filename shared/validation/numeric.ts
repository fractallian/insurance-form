import { type ValidationResult } from './ValidationResult';

export function numeric(key: string, value?: string): ValidationResult {
    const num = Number(value);
    if (Number.isNaN(num)) {
        return { validValue: undefined, errors: { [key]: [`${key} must be a number`] } };
    }
    return { validValue: num };
}

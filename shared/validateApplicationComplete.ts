import {
    CreateApplicationDto,
    ValidationResult,
    VehicleDto,
    validateApplicationField,
    validateVehicleField,
} from '.';

export function validateApplicationComplete(application: CreateApplicationDto): {
    errors?: Record<string, string[]>;
} {
    const errors = {};
    const requiredFields = [
        'firstName',
        'lastName',
        'dateOfBirth',
        'street',
        'city',
        'state',
        'zipCode',
    ];
    requiredFields.forEach((field: string) => {
        const value = application[field as keyof typeof application];
        Object.assign(errors, validate(field, value, required));
        Object.assign(errors, validate(field, value, validateApplicationField));
    });
    if ((application.vehicles?.length || 0) < 3) {
        Object.assign(errors, { vehicles: ['Application must contain at least 3 vehicles'] });
    }
    application.vehicles?.forEach((vehicle, i) => {
        const result = validateVehicleComplete(vehicle);
        Object.entries(result.errors).forEach(([field, err]) => {
            Object.assign(errors, { [`vehicles.${i}.${field}`]: err });
        });
    });

    return Object.keys(errors).length ? { errors } : {};
}

function required(name: string, value: any): ValidationResult {
    if (!value || value.toString().length === 0) {
        return { validValue: undefined, errors: { [name]: [`${name} is required`] } };
    }
    return { validValue: value };
}

function validate(
    name: string,
    value: any,
    validator: (name: string, value: any) => ValidationResult
) {
    return validator(name, value).errors || {};
}

function validateVehicleComplete(vehicle: VehicleDto) {
    const errors = {};
    const requiredFields = ['VIN', 'year', 'make', 'model'];
    requiredFields.forEach((field: string) => {
        const value = vehicle[field as keyof typeof vehicle];
        Object.assign(errors, validate(field, value, required));
        Object.assign(errors, validate(field, value, validateVehicleField));
    });
    return { errors };
}

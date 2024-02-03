import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateApplicationDto, VehicleDto, validateApplicationField } from '../../../shared';
import { validateApplicationComplete } from '../../../shared/validateApplicationComplete';
import { FormData } from '../FormData';
import { apiUrl } from '../apiUrl';

function hasErrors(errorObj: Record<string, string[] | undefined>): boolean {
    for (const errors of Object.values(errorObj)) {
        if (errors && errors.length) return true;
    }
    return false;
}

export const useApplicationForm = () => {
    const [formData, setFormData] = useState<FormData>({}); // whatever is appearing in the form at any given time
    const [validData, setValidData] = useState<CreateApplicationDto>({}); // only valid form data in the format the server is expecting
    const [validationErrors, setValidationErrors] = useState({});
    const { id } = useParams();
    useQuery({
        queryKey: ['current-application'],
        queryFn: async () => {
            const result = await fetch(apiUrl(`applications/${id}`));
            const { data } = await result.json();
            setFormData(data);
            setValidData(data);
            return data;
        },
        enabled: !!id,
    });

    const updateValidData = (key: string, value?: string | number) => {
        setValidData({ ...validData, ...{ [key]: value } });
    };

    const onFieldChange = (name: string, value?: string) => {
        const { errors, validValue } = validateApplicationField(name, value);
        setValidationErrors({
            ...validationErrors,
            ...{ [name]: errors?.[name] || undefined },
        });
        setFormData({ ...formData, ...{ [name]: value } });
        updateValidData(name, validValue);
        return { errors, validValue };
    };

    const isValid = !hasErrors(validationErrors);

    const setVehicles = (vehicles: VehicleDto[]) => {
        console.log({ ...validData, vehicles });
        setValidData({ ...validData, vehicles });
    };

    const validateIsComplete = () => {
        const { errors } = validateApplicationComplete(validData);
        if (errors) {
            setValidationErrors(errors);
            console.error(errors);
            return false;
        }
        return true;
    };

    return {
        isValid,
        formData,
        validData,
        validationErrors,
        onFieldChange,
        setVehicles,
        validateIsComplete,
        setValidationErrors,
    };
};

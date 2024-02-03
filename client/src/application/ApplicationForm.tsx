import { type FormProps } from '../FormData';
import FormField from '../FormField';

export default function ApplicationForm({ formData, onFieldChange, errors }: FormProps) {
    const field = (name: string, label: string, type?: string) => {
        return (
            <FormField
                key={name}
                name={name}
                label={label}
                value={formData[name]}
                errors={errors}
                onChange={onFieldChange}
                type={type}
            />
        );
    };

    return (
        <>
            {field('firstName', 'First Name')}
            {field('lastName', 'Last Name')}
            {field('dateOfBirth', 'Date of Birth', 'date')}
            <h2 className="col-span-2">Address</h2>
            {field('street', 'Street')}
            {field('city', 'City')}
            {field('state', 'State')}
            {field('zipCode', 'Zip Code')}
        </>
    );
}

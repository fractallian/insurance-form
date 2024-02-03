import { type FormProps } from '../FormData';
import FormField from '../FormField';

export default function VehicleForm({
    formData,
    onFieldChange,
    errors,
    index,
}: FormProps & { index: number }) {
    const field = (name: string, label: string) => {
        return (
            <FormField
                name={name}
                errorKey={`vehicles.${index}.${name}`}
                label={label}
                value={formData[name]}
                errors={errors}
                onChange={onFieldChange}
            />
        );
    };

    return (
        <div className="grid grid-cols-subgrid col-span-2 gap-2 border border-black rounded-lg p-2">
            {field('VIN', 'VIN')}
            {field('year', 'Year')}
            {field('make', 'Make')}
            {field('model', 'Model')}
        </div>
    );
}

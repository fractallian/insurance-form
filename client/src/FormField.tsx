import { FormPrimitive } from './FormData';

export default function FormField({
    name,
    errorKey = name,
    label,
    value,
    errors,
    onChange,
    type = 'text',
}: {
    name: string;
    errorKey?: string;
    label: string;
    value: FormPrimitive;
    type?: string;
    errors?: Record<string, string[]>;
    onChange: (name: string, value?: string) => void;
}) {
    return (
        <>
            <div className="text-red-600">{errors?.[errorKey]?.[0]}</div>
            <label className="grid grid-cols-subgrid col-span-2 gap-2">
                <div className="text-right">{label}</div>
                <input
                    type={type}
                    onChange={(e) => {
                        onChange(name, e.target.value);
                    }}
                    value={value || ''}
                />
            </label>
        </>
    );
}

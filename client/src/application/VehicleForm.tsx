import { type FormProps } from '../FormData';

export default function VehicleForm({ formData, onFieldChange, errors }: FormProps) {
    const { VIN, year, make, model } = formData;

    return (
        <div className="">
            <pre>{errors && JSON.stringify(errors, null, 2)}</pre>
            <label className="">
                VIN
                <input
                    id="VIN"
                    type="text"
                    onChange={(e) => onFieldChange('VIN', e.target.value)}
                    value={VIN || ''}
                />
            </label>
            <br />
            <label>
                Year
                <input
                    id="year"
                    type="text"
                    onChange={(e) => onFieldChange('year', e.target.value)}
                    value={year || ''}
                />
            </label>
            <br />
            <label>
                Make
                <input
                    id="make"
                    type="text"
                    onChange={(e) => onFieldChange('make', e.target.value)}
                    value={make || ''}
                />
            </label>
            <br />
            <label>
                Model
                <input
                    id="model"
                    type="text"
                    onChange={(e) => onFieldChange('model', e.target.value)}
                    value={model || ''}
                />
            </label>
        </div>
    );
}

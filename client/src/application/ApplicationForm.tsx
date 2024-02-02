import { type FormProps } from '../FormData';
import ApplicationVehiclesForm from './ApplicationVehiclesForm';

export default function ApplicationForm({ formData, onFieldChange, errors }: FormProps) {
    const { firstName, lastName, street, city, state, zipCode, dateOfBirth } = formData;

    return (
        <div className="grid">
            <pre>{errors && JSON.stringify(errors, null, 2)}</pre>
            <br />
            <label className="grid-row">
                First Name
                <input
                    id="firstName"
                    type="text"
                    onChange={(e) => onFieldChange('firstName', e.target.value)}
                    value={firstName || ''}
                />
            </label>
            <br />
            <label>
                Last Name
                <input
                    id="lastName"
                    type="text"
                    onChange={(e) => onFieldChange('lastName', e.target.value)}
                    value={lastName || ''}
                />
            </label>
            <br />
            <label>
                Date of Birth
                <input
                    id="dateOfBirth"
                    type="date"
                    onChange={(e) => onFieldChange('dateOfBirth', e.target.value)}
                    value={dateOfBirth || ''}
                />
            </label>
            <br />
            <h2>Address</h2>
            <label>
                Street
                <input
                    id="street"
                    type="text"
                    onChange={(e) => onFieldChange('street', e.target.value)}
                    value={street || ''}
                />
            </label>
            <br />
            <label>
                City
                <input
                    id="city"
                    type="text"
                    onChange={(e) => onFieldChange('city', e.target.value)}
                    value={city || ''}
                />
            </label>
            <br />
            <label>
                State
                <input
                    id="state"
                    type="text"
                    onChange={(e) => onFieldChange('state', e.target.value)}
                    value={state || ''}
                />
            </label>
            <br />
            <label>
                Zip Code
                <input
                    id="zipCode"
                    type="text"
                    onChange={(e) => onFieldChange('zipCode', e.target.value)}
                    value={zipCode || ''}
                />
            </label>
        </div>
    );
}

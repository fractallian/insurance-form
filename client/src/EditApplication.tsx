import { useMutation } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { VehicleDto } from '../../shared';
import { apiUrl } from './apiUrl';
import ApplicationForm from './application/ApplicationForm';
import ApplicationVehiclesForm from './application/ApplicationVehiclesForm';
import { useApplicationForm } from './application/useApplicationForm';

export default function EditApplication() {
    const { formData, validData, validationErrors, onFieldChange, setVehicles } =
        useApplicationForm();
    const { id } = useParams();

    const { mutate: updateApplication } = useMutation({
        mutationFn: async () => {
            // POST: /applications/:id
            return fetch(apiUrl(`applications/${id}`), {
                method: 'PUT',
                body: JSON.stringify(validData),
                headers: [['Content-Type', 'application/json']],
            }).then((res) => {
                res.json().then(({ message }) => {
                    console.log(message);
                });
            });
        },
    });

    const { mutate: submitApplication } = useMutation({
        mutationFn: async () => {
            // POST: /applications/:id/submit
            return fetch(apiUrl(`applications/${id}/submit`), {
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: [['Content-Type', 'application/json']],
            }).then((res) => {
                res.json().then(({ message }) => {
                    console.log(message);
                });
            });
        },
    });

    const onButtonClick = (e: any) => {
        e.preventDefault();
        submitApplication();
    };

    const handleOnFieldChange = (name: string, value?: string) => {
        const { errors } = onFieldChange(name, value);
        if (!errors) {
            updateApplication();
        }
    };

    const onSetVehicles = (vehicles: VehicleDto[]) => {
        setVehicles(vehicles);
        updateApplication();
    };

    return (
        <>
            <Link to="/">Start Over</Link>
            <form>
                <h1>Edit Application</h1>
                <ApplicationForm
                    {...{ formData, errors: validationErrors, onFieldChange: handleOnFieldChange }}
                />
                <ApplicationVehiclesForm
                    vehicles={validData.vehicles || []}
                    setVehicles={onSetVehicles}
                />
                <button onClick={onButtonClick}>Submit Application</button>
            </form>
        </>
    );
}

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { VehicleDto } from '../../shared';
import { apiUrl } from './apiUrl';
import ApplicationForm from './application/ApplicationForm';
import ApplicationVehiclesForm from './application/ApplicationVehiclesForm';
import { useApplicationForm } from './application/useApplicationForm';

export default function EditApplication() {
    const {
        formData,
        validData,
        validationErrors,
        setValidationErrors,
        onFieldChange,
        setVehicles,
        validateIsComplete,
    } = useApplicationForm();
    const { id } = useParams();
    const [price, setPrice] = useState<number>();

    const { mutate: updateApplication } = useMutation({
        mutationFn: async () => {
            // PUT: /applications/:id
            return fetch(apiUrl(`applications/${id}`), {
                method: 'PUT',
                body: JSON.stringify(validData),
                headers: [['Content-Type', 'application/json']],
            }).then((res) => {
                res.json().then(({ data }) => {
                    if (data?.vehicles) setVehicles(data?.vehicles);
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
                res.json().then(({ data: { price: appPrice } }) => {
                    if (appPrice) {
                        setPrice(appPrice);
                    }
                });
            });
        },
    });

    const onButtonClick = (e: any) => {
        e.preventDefault();
        validateIsComplete();
        submitApplication();
    };

    const handleOnFieldChange = (name: string, value?: string) => {
        const { errors } = onFieldChange(name, value);
        if (!errors) {
            updateApplication();
        }
        return true;
    };

    const onSetVehicles = (vehicles: VehicleDto[]) => {
        setVehicles(vehicles);
        updateApplication();
    };

    if (price) {
        return <h1 className="p-10 text-center">Your Price: ${price}.00</h1>;
    }

    return (
        <div className="m-10">
            <Link to="/">Start Over</Link>
            <form>
                <h1>Edit Application</h1>
                <div className="grid grid-cols-2 gap-2">
                    <ApplicationForm
                        {...{
                            formData,
                            errors: validationErrors,
                            onFieldChange: handleOnFieldChange,
                        }}
                    />
                    <ApplicationVehiclesForm
                        vehicles={validData.vehicles || []}
                        setVehicles={onSetVehicles}
                        errors={validationErrors}
                        setErrors={setValidationErrors}
                    />
                </div>
                <button onClick={onButtonClick}>Submit Application</button>
            </form>
        </div>
    );
}

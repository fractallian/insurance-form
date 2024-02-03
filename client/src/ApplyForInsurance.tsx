import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from './apiUrl';
import ApplicationForm from './application/ApplicationForm';
import ApplicationVehiclesForm from './application/ApplicationVehiclesForm';
import { useApplicationForm } from './application/useApplicationForm';

export default function ApplyForInsurance() {
    const {
        formData,
        validData,
        validationErrors,
        onFieldChange,
        setVehicles,
        setValidationErrors,
    } = useApplicationForm();
    const navigate = useNavigate();

    const { mutate: startApplication } = useMutation({
        mutationFn: async () => {
            // POST: /applications
            return fetch(apiUrl('applications'), {
                method: 'POST',
                body: JSON.stringify(validData),
                headers: [['Content-Type', 'application/json']],
            }).then((res) => {
                res.json().then(({ data }) => {
                    navigate(data.resume);
                });
            });
        },
    });

    const onButtonClick = (e: any) => {
        e.preventDefault();
        startApplication();
    };

    return (
        <>
            <form className="m-10">
                <h1>Initial Data</h1>
                <div className="grid grid-cols-2 gap-2">
                    <ApplicationForm {...{ formData, onFieldChange, errors: validationErrors }} />
                    <ApplicationVehiclesForm
                        vehicles={validData.vehicles || []}
                        setVehicles={setVehicles}
                        errors={validationErrors}
                        setErrors={setValidationErrors}
                    />
                </div>
                <button onClick={onButtonClick}>Start Application</button>
            </form>
        </>
    );
}

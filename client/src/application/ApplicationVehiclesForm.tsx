import { useEffect, useState } from 'react';
import { validateVehicleField, type VehicleDto } from '../../../shared';
import { FormData } from '../FormData';
import VehicleForm from './VehicleForm';

interface ApplicationVehiclesFormProps {
    vehicles: VehicleDto[];
    setVehicles: (vehicles: VehicleDto[]) => void;
    errors: Record<string, string[]>;
    setErrors: (errors: Record<string, string[]>) => void;
}

export default function ApplicationVehiclesForm({
    vehicles,
    setVehicles,
    errors,
    setErrors,
}: ApplicationVehiclesFormProps) {
    const setVehicle = (index: number, vehicle: VehicleDto) => {
        const allVehicles: VehicleDto[] = vehicles.with(index, vehicle);
        setVehicles(allVehicles);
    };

    const addVehicle = (e: any) => {
        e.preventDefault();
        setVehicles([...vehicles, ...[{}]]);
    };

    const setVehicleErrors = (index: number, errors: Record<string, string[]>) => {
        // Object.entries(errors).forEach(([field, errs]) => {
        //     if (errs) {
        //         const key = `vehicles.${index}.${field}`;
        //         setErrors({ ...errors, ...{ [key]: errs } });
        //     }
        // });
    };

    return (
        <>
            <h2>Vehicles</h2>
            <div className="text-red-600">{errors?.vehicles?.[0]}</div>
            {vehicles?.map((v, i) => (
                <EditVehicleForm
                    key={i}
                    index={i}
                    vehicle={v}
                    setVehicle={(v) => setVehicle(i, v)}
                    errors={errors}
                    setErrors={setErrors}
                />
            ))}
            <div className="col-span-2">
                <button onClick={addVehicle}>Add Vehicle</button>
            </div>
        </>
    );
}

interface EditVehicleFormProps {
    vehicle: VehicleDto;
    index: number;
    setVehicle: (vehicle: VehicleDto) => void;
    errors: Record<string, string[]>;
    setErrors: (errors: Record<string, string[]>) => void;
}

function EditVehicleForm({ vehicle, index, setVehicle, errors, setErrors }: EditVehicleFormProps) {
    const [formData, setFormData] = useState<FormData>({});

    useEffect(() => {
        setFormData(
            Object.entries(vehicle).reduce((acc, [key, value]) => {
                value && (acc[key] = value.toString());
                return acc;
            }, {} as FormData)
        );
    }, [vehicle]);

    const onFieldChange = (name: string, value?: string) => {
        const { errors: fieldErrors, validValue } = validateVehicleField(name, value);

        setErrors({
            ...errors,
            ...{ [`vehicles.${index}.${name}`]: fieldErrors?.[name] || [] },
        });

        const newVehicle = { ...formData, ...{ [name]: value } };
        setFormData(newVehicle);

        const newValidVehicle = { ...vehicle, ...{ [name]: validValue } };
        if (!fieldErrors) {
            setVehicle(newValidVehicle);
        }
        return { errors, validValue };
    };

    return (
        <VehicleForm
            formData={formData}
            onFieldChange={onFieldChange}
            errors={errors}
            index={index}
        />
    );
}

import { useEffect, useState } from 'react';
import { validateVehicleField, type VehicleDto } from '../../../shared';
import { FormData } from '../FormData';
import VehicleForm from './VehicleForm';

interface ApplicationVehiclesFormProps {
    vehicles: VehicleDto[];
    setVehicles: (vehicles: VehicleDto[]) => void;
}

export default function ApplicationVehiclesForm({
    vehicles,
    setVehicles,
}: ApplicationVehiclesFormProps) {
    const setVehicle = (index: number, vehicle: VehicleDto) => {
        const allVehicles: VehicleDto[] = vehicles.with(index, vehicle);
        setVehicles(allVehicles);
    };

    const addVehicle = (e: any) => {
        e.preventDefault();
        setVehicles([...vehicles, ...[{}]]);
    };

    return (
        <>
            <h2>Vehicles</h2>
            {vehicles?.map((v, i) => (
                <EditVehicleForm key={i} vehicle={v} setVehicle={(v) => setVehicle(i, v)} />
            ))}
            <button onClick={addVehicle}>Add Vehicle</button>
        </>
    );
}

interface EditVehicleFormProps {
    vehicle: VehicleDto;
    setVehicle: (vehicle: VehicleDto) => void;
}

function EditVehicleForm({ vehicle, setVehicle }: EditVehicleFormProps) {
    const [formData, setFormData] = useState<FormData>({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData(
            Object.entries(vehicle).reduce((acc, [key, value]) => {
                value && (acc[key] = value.toString());
                return acc;
            }, {} as FormData)
        );
    }, [vehicle]);

    const onFieldChange = (name: string, value?: string) => {
        const { errors, validValue } = validateVehicleField(name, value);
        setErrors({
            ...errors,
            ...{ [name]: errors?.[name] || undefined },
        });
        const newVehicle = { ...formData, ...{ [name]: value } };
        setFormData(newVehicle);

        const newValidVehicle = { ...vehicle, ...{ [name]: validValue } };
        if (!errors) {
            setVehicle(newValidVehicle);
        }
        return { errors, validValue };
    };

    return <VehicleForm formData={formData} onFieldChange={onFieldChange} errors={errors} />;
}

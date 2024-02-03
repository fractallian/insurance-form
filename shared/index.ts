export * from './validateApplicationField';
export * from './validateVehicleField';
export * from './validation';

export interface CreateApplicationDto {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: number;
    vehicles?: VehicleDto[];
}

export interface VehicleDto {
    id?: number;
    applicationId?: number;
    VIN?: string;
    year?: number;
    make?: string;
    model?: string;
}

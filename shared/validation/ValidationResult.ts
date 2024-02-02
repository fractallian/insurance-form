export interface ValidationResult {
    errors?: Record<string, string[]>;
    validValue: string | number | undefined;
}

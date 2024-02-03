export type FormPrimitive = string | undefined;

export type FormData = Record<string, FormPrimitive>;

export interface FormProps {
    formData: FormData;
    onFieldChange: (fieldName: string, fieldValue?: string) => void;
    errors: Record<string, string[]>;
}

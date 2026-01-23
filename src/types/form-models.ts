export interface FormField {
  name: string;
  type: string;
  value: any;
  required: boolean;
  validation?: (value: any) => string | null;
}

export interface FormState {
  fields: Record<string, FormField>;
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

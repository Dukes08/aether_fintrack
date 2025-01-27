export interface ModalField {
  label: string;
  name: string;
  type: string;  
  required: boolean;
  minValue?: number;
  maxValue?: number;
  options?: { label: string, value: string }[];
}

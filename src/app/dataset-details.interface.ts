export interface DatasetField {
    value: string;
    value_label: string | null;
    field_label: { [key: string]: string }; // Object with dynamic keys, e.g., 'en', 'nl'
    visible: boolean;
  }
  
  export interface DatasetDetails {
    [key: string]: DatasetField; // An object with dynamic keys and DatasetField as value
  }
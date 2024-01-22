export interface ValueLabel {
  [key: string]: string;
}

export interface DatasetField {
  value: string | string[] | null;
  value_label: string | ValueLabel | null;
  field_label: string | ValueLabel | null; // Object with dynamic keys, e.g., 'en', 'nl'
  visible: boolean;
}

export interface DatasetDetails {
  [key: string]: DatasetField; // An object with dynamic keys and DatasetField as value
}

export interface Dataset {
  result: DatasetDetails;
}

export interface Response {
  result: {
    count: number;
    results: string[];
  };
}

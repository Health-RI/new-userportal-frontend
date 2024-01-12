export interface PartialDataset {
  id: string;
  title: string;
  description: string;
  modified: Date;
  organization: string;
  publisher_name: string;
  tags: string[];
  theme: string[];
  format: string;
}

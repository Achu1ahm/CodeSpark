export interface Concept {
    id: number;
    title: string;
    language: string;
    description: string;
    // Fields for detailed view
    content?: string;
    task?: string;
  }
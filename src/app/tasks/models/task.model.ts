export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updating?: boolean; // Para manejar el estado de loading durante actualizaciones
} 
export interface ICategory {
  id: string;
  type: string;
  color: string;
  description: string;
  currentAmount: number;
  maxAmount: number;
}

export interface IBudgets {
  id: string;
  user: string;
  name: string;
  currentAmount: number;
  maxAmount: number;
  categories: [ICategory];
  createdAt: Date;
  updtedAt: Date;
}
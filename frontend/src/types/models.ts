export interface ICategory {
  id: string;
  type: string;
  color: string;
  description: string;
  currentAmount: number;
  maxAmount: number;
  transactions: string[];
}

export interface IBudget {
  id: string;
  user: string;
  name: string;
  currentAmount: number;
  maxAmount: number;
  categories: ICategory[];
  createdAt: Date;
  updtedAt: Date;
}

export interface ITransaction {
  id: string;
  type: string;
  amount: string;
  category: string;
  description: string;
  date: string;
}

export interface ICategory {
  type: string;
  maxAmount: Number;
  currentAmount: Number;
  color: string;
  description: string;
}

export default class Budget {
  public id: string | undefined;
  public user: string | undefined;
  public name: string;
  public currentAmount: Number;
  public maxAmount: Number;
  public categories: Array<ICategory>;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

  constructor(
    name: string,
    currentAmount: Number,
    maxAmount: Number,
    categories: Array<ICategory>,
    createAt?: Date,
    updatedAt?: Date,
    id?: string,
    user?: string
  ) {
    this.id = id;
    this.user = user;
    this.name = name;
    this.currentAmount = currentAmount;
    this.maxAmount = maxAmount;
    this.categories = categories;
    this.createdAt = createAt;
    this.updatedAt = updatedAt;
  }
}

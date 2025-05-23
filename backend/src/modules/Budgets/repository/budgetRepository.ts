import { Model } from "mongoose";
import type { IBudgetModel, IBudgetModelPopulated } from "../model/budgetModel.ts";
import Budget from "../entity/budgetEntity.ts";
import { modelToEntityBudget } from "../utils/budgetMapper.ts";

export default class BudgetRepository {
  private BudgetModel: Model<IBudgetModel>;

  constructor(budgetModel: Model<IBudgetModel>) {
    this.BudgetModel = budgetModel;
  }

  public async getAll(){
    const allBudgets = await this.BudgetModel.find()
    .populate("categories").exec() as unknown as IBudgetModelPopulated[];
    return allBudgets.map((budget) => modelToEntityBudget(budget));
  }

  public async save(budget: Budget) {
    if (budget.id) {
      null;
    } else {
      const model = new this.BudgetModel({
        name: budget.name,
        categories: budget.categories,
        currentAmount: budget.currentAmount,
        maxAmount: budget.maxAmount,
      });
      await model.save();
    }
  }
}

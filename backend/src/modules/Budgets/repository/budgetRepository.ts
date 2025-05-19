import { Model } from "mongoose";
import type { IBudgetModel } from "../model/budgetModel.ts";
import Budget from "../entity/budgetEntity.ts";
import { modelToEntityBudget } from "../utils/budgetMapper.ts";

export default class BudgetRepository {
  private BudgetModel: Model<IBudgetModel>;

  constructor(budgetModel: Model<IBudgetModel>) {
    this.BudgetModel = budgetModel;
  }

  public async getAll(){
    const allBudgets = await this.BudgetModel.find().populate("categories").exec();
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
      // console.log(model)
      await model.save();
    }
  }
}

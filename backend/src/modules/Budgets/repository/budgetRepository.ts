import { Model } from "mongoose";
import type { IBudget } from "../model/budgetModel.ts";
import Budget from "../entity/budgetEntity.ts";

export default class BudgetRepository {
  private BudgetModel: Model<IBudget>;

  constructor(budgetModel: Model<IBudget>) {
    this.BudgetModel = budgetModel;
  }

  public async getAll() {
    const allBudgets = await this.BudgetModel.find();
    return allBudgets;
  }

  public async save(budget: Budget){
    if(budget.id){
      null
    }else{
      const model = new this.BudgetModel({
        name: budget.name,
        categories: budget.categories,
        currentAmount: budget.currentAmount,
        maxAmount: budget.maxAmount
      });
      // console.log("model: ",model)
      // await model.save()
    }
  }
}

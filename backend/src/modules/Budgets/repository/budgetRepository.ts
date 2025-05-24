import { Model, ObjectId } from "mongoose";
import type {
  IBudgetModel,
  IBudgetModelPopulated,
} from "../model/budgetModel.ts";
import Budget from "../entity/budgetEntity.ts";
import { modelToEntityBudget } from "../utils/budgetMapper.ts";
import { error } from "zod/v4/locales/ar.js";
import { type UpdatedBusgetPayloads } from "../../../common/eventPayloads.ts";

export default class BudgetRepository {
  private BudgetModel: Model<IBudgetModel>;

  constructor(budgetModel: Model<IBudgetModel>) {
    this.BudgetModel = budgetModel;
  }

  public async getAll() {
    const allBudgets = (await this.BudgetModel.find()
      .populate("categories")
      .exec()) as unknown as IBudgetModelPopulated[];
    return allBudgets.map((budget) => modelToEntityBudget(budget));
  }

  public async save(budget: Budget) {
    const model = new this.BudgetModel({
      name: budget.name,
      categories: budget.categories,
      currentAmount: budget.currentAmount,
      maxAmount: budget.maxAmount,
    });
    await model.save();
    return model.id as ObjectId;
  }

  public async updateAfterCreate(data: any) {
    const categories = { categories: data.categoriesId };
    await this.BudgetModel.findByIdAndUpdate(data.budgetId, categories);
  }

  public async updateBudgetProgress(data: UpdatedBusgetPayloads){
    const budget = await this.BudgetModel.findOne({categories: data.categoryId})
    if(!budget){
      throw new Error(`Budget with id ${data.categoryId} not found`);
    }
    console.log(budget.currentAmount)
    console.log(data.currentAmount)
    const newCurrentAmount = budget?.currentAmount + data.currentAmount
    console.log(newCurrentAmount)
    await this.BudgetModel.findByIdAndUpdate(budget?.id, {currentAmount: newCurrentAmount});
  }
}

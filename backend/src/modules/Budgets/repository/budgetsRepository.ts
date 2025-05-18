import { Model } from "mongoose"
import type { IBudget } from "../model/BudgetsModel.ts"

export default class BudgetsRepository{
    private BudgetModel : Model<IBudget>
    
    constructor(
        budgetModel: Model<IBudget>
    ){
        this.BudgetModel = budgetModel
    }

    public async getAll(){
        const allBudgets = await this.BudgetModel.find();
        return allBudgets;
    }
}
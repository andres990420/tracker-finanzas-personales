import { ObjectId } from "mongoose";
import EventBus from "../../../common/eventBus.ts";
import { EventTypes } from "../../../common/eventTypes.ts";
import Budget from "../entity/budgetEntity.ts";
import BudgetRepository from "../repository/budgetRepository.ts";
import { formToEntityBudget, type IBudgetForm } from "../utils/budgetMapper.ts";

export default class BudgetService {
  private budgetRepository: BudgetRepository;

  constructor(budgetRepository: BudgetRepository) {
    this.budgetRepository = budgetRepository;
    EventBus.on(EventTypes.UPDATE_AFTER_CREATE_BUDGET, async (data) => {
      await this.budgetRepository.updateAfterCreate(data);
    });
    
    EventBus.on(EventTypes.UPDATED_BUDGET, async (data) => {
      await this.budgetRepository.updateBudgetProgress(data)
    });
  }
  public async getAll(userId: ObjectId) {
    return await this.budgetRepository.getAll(userId);
  }

  public async save(formData: IBudgetForm, userId: ObjectId) {
    const newbudget = formToEntityBudget(formData, userId);
    const budgetId = await this.budgetRepository.save(newbudget);
    const data = {
      budgetId: budgetId,
      userId: userId,
      categoriesData: {
        categoriesLimits: formData["category-limit"],
        categoriesDescriptions: formData["category-description"],
        categoriesTypes: formData["category-type"],
        categoriesColor: formData["category-color"],
      },
    };

    EventBus.emit(EventTypes.CREATE_CATEGORY, data);
  }
}

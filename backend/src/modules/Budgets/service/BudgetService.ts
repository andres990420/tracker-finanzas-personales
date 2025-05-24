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
    EventBus.on(EventTypes.CREATE_BUDGET, async (data) => {
      await this.budgetRepository.updateAfterCreate(data);
    });
    EventBus.on(EventTypes.UPDATED_BUDGET, async (data) => {});
  }
  public async getAll() {
    return await this.budgetRepository.getAll();
  }

  public async save(formData: IBudgetForm) {
    const newbudget = formToEntityBudget(formData);
    const budgetId = await this.budgetRepository.save(newbudget);
    const data = {
      budgetId: budgetId,
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

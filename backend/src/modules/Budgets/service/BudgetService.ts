import Budget from "../entity/budgetEntity.ts";
import BudgetRepository from "../repository/budgetRepository.ts";

export default class BudgetService {
  private budgetRepository: BudgetRepository;

  constructor(budgetRepository: BudgetRepository) {
    this.budgetRepository = budgetRepository;
  }
  public async getAll() {
    return await this.budgetRepository.getAll();
  }

  public async save(budget: Budget){
    return await this.budgetRepository.save(budget)
  }
}

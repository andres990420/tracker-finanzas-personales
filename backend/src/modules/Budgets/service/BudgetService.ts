import BudgetRepository from "../repository/budgetRepository.ts";

export default class BudgetService {
  private budgetRepository: BudgetRepository;

  constructor(budgetRepository: BudgetRepository) {
    this.budgetRepository = budgetRepository;
  }
  public async getAll() {
    return await this.budgetRepository.getAll();
  }
}

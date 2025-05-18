import BudgetsRepository from "../repository/budgetsRepository.ts";

export default class BudgetsService {
  private budgetRepository: BudgetsRepository;

  constructor(budgetRepository: BudgetsRepository) {
    this.budgetRepository = budgetRepository;
  }
  public async getAll() {
    return await this.budgetRepository.getAll();
  }
}

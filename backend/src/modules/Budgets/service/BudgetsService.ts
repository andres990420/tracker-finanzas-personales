import BudgetsRepository from "../repository/budgetsRepository.ts";

export default class BudgetsService {
  private budgetRepository: BudgetsRepository;

  constructor(budgetRepository: BudgetsRepository) {
    this.budgetRepository = budgetRepository;
  }
  getAll() {
    return this.budgetRepository.getAll();
  }
}

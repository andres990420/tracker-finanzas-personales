import Transaction from "../entity/transactionEntity.ts";
import TransactionRepository from "../repository/transactionRepository.ts";

export default class TransactionService {
  private transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async getAll() {
    return await this.transactionRepository.getAll();
  }

  public async save(transaction: Transaction) {
    return await this.transactionRepository.saveTransaction(transaction);
  }
}

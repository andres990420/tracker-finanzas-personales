import TransaccionModel from "./model/transactionModel.ts";
import TransactionRepository from "./repository/transactionRepository.ts";
import TransactionService from "./service/transactionService.ts";
import TransactionController from "./controller/transactionController.ts";
import type { Application } from "express";
import type { AppContainer } from "../../config/diContainer.ts";

export function transactionContainer(container: AppContainer) {
  return container
    .add("transactionModel", () => TransaccionModel)
    .add(
      "transactionRepository",
      ({ transactionModel }) => new TransactionRepository(transactionModel)
    )
    .add(
      "transactionService",
      ({ transactionRepository }) =>
        new TransactionService(transactionRepository)
    )
    .add(
      "transactionController",
      ({ transactionService }) => new TransactionController(transactionService)
    );
}

export default function initTransactionModule(
  app: Application,
  container: Object & {
    get(key: "transactionController"): TransactionController;
  }
) {
  const controller = container.get("transactionController");
  controller.configureRoutes(app);
}

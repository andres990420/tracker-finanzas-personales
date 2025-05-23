import MovementModel from "./model/movementModel.ts";
import MovementRepository from "./repository/movementRepository.ts";
import MovementService from "./service/movementService.ts";
import MovementController from "./controller/movementController.ts";
import type { Application } from "express";
import type { AppContainer } from "../../config/diContainer.ts";

export function movementContainer(container: AppContainer) {
  return container
    .add("movementModel", () => MovementModel)
    .add(
      "movementRepository",
      ({ movementModel }) => new MovementRepository(movementModel)
    )
    .add(
      "movementService",
      ({ movementRepository }) => new MovementService(movementRepository)
    )
    .add(
      "movementController",
      ({ movementService }) => new MovementController(movementService)
    );
}

export default function initMovementModule(
  app: Application,
  container: Object & { get(key: "movementController"): MovementController }
) {
  const controller = container.get("movementController");
  controller.configureRoutes(app);
}

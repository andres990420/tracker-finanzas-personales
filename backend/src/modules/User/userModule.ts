import UserModel from "./model/userModel.ts";
import UserRepository from "./repository/userRepository.ts";
import UserService from "./service/userService.ts";
import UserController from "./controller/userController.ts";
import type { Application } from "express";
import {type AppContainer } from "../../config/diContainer.ts";


export function userContainer(container: AppContainer) {
  return container
    .add("userModel", () => UserModel)
    .add("userRepository", ({ userModel }) => new UserRepository(userModel))
    .add("userService", ({ userRepository }) => new UserService(userRepository))
    .add(
      "userController",
      ({ userService }) => new UserController(userService)
    );
}

export default function initUserModule(
  app: Application,
  container: Object & { get(key: "userController"): UserController }
) {
  const controller = container.get("userController");
  controller.configureRoutes(app);
}

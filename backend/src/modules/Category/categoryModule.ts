import { AppContainer } from "../../config/diContainer.ts";
import CategoryModel from "./model/categoryModel.ts";
import CategoryRepository from "./repository/categoryRepository.ts";
import CategoryService from "./service/categoryService.ts";

export function categoryContainer(container: AppContainer){
    return container
        .add("categoryModel", ()=> CategoryModel)
        .add("categoryRepository", ({categoryModel})=> new CategoryRepository(categoryModel))
        .add("categoryService", ({categoryRepository})=> new CategoryService(categoryRepository))
}
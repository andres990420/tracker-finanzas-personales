import mediator from "../../../common/mediator.ts";
import type { ICategory } from "../entity/categoryEntity.ts";
import CategoryRepository from "../repository/categoryRepository.ts";

export default class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public async save(categories: Array<ICategory>) {
    
    return this.categoryRepository.save(categories);
  }
}

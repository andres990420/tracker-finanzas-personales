import EventBus from "../../../common/eventBus.ts";
import { EventTypes } from "../../../common/eventTypes.ts";
import type { ICategory } from "../entity/categoryEntity.ts";
import CategoryRepository from "../repository/categoryRepository.ts";
import { formToEntityCategory } from "../utils/categoryMapper.ts";

export default class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;

    EventBus.on(EventTypes.ADD_TRANSACTION_INTO_CATEGORY, async (data) => {
      await this.categoryRepository.updateCategoryTransaction(data)
      const dataToBudget = {categoryId: data.categoryId, currentAmount: data.amount}
      EventBus.emit(EventTypes.UPDATED_BUDGET, dataToBudget)
    });

    EventBus.on(EventTypes.CREATE_CATEGORY, async (data) => {
      const categoriesData = data.categoriesData;
      const categoryForm = {
        categoryTypes: categoriesData.categoriesTypes,
        categoryLimits: categoriesData.categoriesLimits,
        categoryColor: categoriesData.categoriesColor,
        categoryDescription: categoriesData.categoriesDescriptions,
      };
      const categories = formToEntityCategory(categoryForm);
      const categoriesId = await this.categoryRepository.save(categories);
      const budgetsData = { categoriesId: categoriesId, budgetId: data.budgetId };
      EventBus.emit(EventTypes.CREATE_BUDGET, budgetsData);
    });
  }

  public async save(categories: Array<ICategory>) {
    await this.categoryRepository.save(categories);
    return;
  }
}

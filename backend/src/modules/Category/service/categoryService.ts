import { ObjectId } from "mongoose";
import EventBus from "../../../common/eventBus.ts";
import { EventTypes } from "../../../common/eventTypes.ts";
import CategoryRepository from "../repository/categoryRepository.ts";
import { formToEntityCategory } from "../utils/categoryMapper.ts";
import type { ITransaccionModel } from "../../Movements/model/transactionModel.ts";


export default class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;

    EventBus.on(EventTypes.ADD_TRANSACTION_INTO_CATEGORY, async (data) => {
      await this.categoryRepository.addCategoryTransaction(data);
      const dataToBudget = {
        categoryId: data.categoryId
      };

      EventBus.emit(EventTypes.UPDATED_BUDGET, dataToBudget);
    });

    EventBus.on(EventTypes.CREATE_CATEGORY, async (data) => {
      const categoriesData = data.categoriesData;
      const categoryForm = {
        categoryTypes: categoriesData.categoriesTypes,
        categoryLimits: categoriesData.categoriesLimits,
        categoryColor: categoriesData.categoriesColor,
        categoryDescription: categoriesData.categoriesDescriptions,
      };
      const categories = formToEntityCategory(categoryForm, data.userId);
      const categoriesId = await this.categoryRepository.save(categories);
      const budgetsData = {
        categoriesId: categoriesId,
        budgetId: data.budgetId,
      };

      EventBus.emit(EventTypes.UPDATE_AFTER_CREATE_BUDGET, budgetsData);
    });

    EventBus.on(EventTypes.UPDATE_CATEGORY, async (data) => {
      const category =
        await this.categoryRepository.getbyTransactionIdPopulated(
          data.transactionId as ObjectId
        );
      let udpatedAmount: number = 0;

      category.transactions?.map((transaction) => {
        if (typeof transaction === "object" && "amount" in transaction) {
          udpatedAmount += (transaction as ITransaccionModel).amount as number;
        }
      });

      if (category.id) {
        await this.categoryRepository.updatedCategoryTransaction(
          category.id,
          udpatedAmount
        );
      }
    });

    EventBus.on(EventTypes.DELETE_TRANSACTION_FROM_CATEGORY, async (data) => {
      const category = await this.categoryRepository.getByTransactionId(
        data.transactionId
      );
      
      if(category.transactions){
        
      const index = category.transactions.indexOf(data.transactionId as ObjectId & ITransaccionModel)
      category.transactions.splice(index, 1);
      };

      category.currentAmount -= data.amount
      
      await this.categoryRepository.updateCategory(category)

      EventBus.emit(EventTypes.UPDATED_BUDGET, {categoryId: category.id as ObjectId})
    });
  }
}

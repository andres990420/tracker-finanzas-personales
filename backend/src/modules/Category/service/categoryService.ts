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

    // AGREGAR TRANSACCION A UNA CATEGORIA
    EventBus.on(EventTypes.ADD_TRANSACTION_INTO_CATEGORY, async (data) => {
      let dataToBudget;
      try {
        await this.categoryRepository.addCategoryTransaction(data);
        dataToBudget = {
          categoryId: data.categoryId,
        };
      } catch (error) {
        console.error(
          "Error en el EventBus ADD_TRANSACTION_INTO_CATEGORY listener",
          error
        );
        throw new Error("Ha ocurrido un erro al agregar una nueva transaccion");
      }
      EventBus.emit(EventTypes.UPDATED_BUDGET, dataToBudget);
    });

    // CREAR UNA NUEVA CATEGORIA
    EventBus.on(EventTypes.CREATE_CATEGORY, async (data) => {
      const categoriesData = data.categoriesData;
      const categoryForm = {
        categoryTypes: categoriesData.categoriesTypes,
        categoryLimits: categoriesData.categoriesLimits,
        categoryColor: categoriesData.categoriesColor,
        categoryDescription: categoriesData.categoriesDescriptions,
      };
      const categories = formToEntityCategory(categoryForm, data.userId);

      let budgetsData;
      try {
        const categoriesId = await this.categoryRepository.save(categories);
        budgetsData = {
          categoriesId: categoriesId,
          budgetId: data.budgetId,
        };
      } catch (error) {
        console.error("Error en EventBus CREATE_CATEGORY listener:", error);
        throw new Error("Ha ocurrido un error al guardar la transaccion");
      }
      EventBus.emit(EventTypes.UPDATE_AFTER_CREATE_BUDGET, budgetsData);
    });

    // ACTUALIZAR CATEGORIA
    EventBus.on(EventTypes.UPDATE_CATEGORY, async (data) => {
      let category;
      try {
        category = await this.categoryRepository.getbyTransactionIdPopulated(
          data.transactionId as ObjectId
        );
      } catch (error) {
        console.error("Error en EventBus UPDATE_CATEGORY listener:", error);
        throw new Error("Ha ocurrido un error al obtener la transaccion");
      }

      let udpatedAmount: number = 0;

      if (category) {
        category.transactions?.map((transaction) => {
          if (typeof transaction === "object" && "amount" in transaction) {
            udpatedAmount += (transaction as ITransaccionModel)
              .amount as number;
          }
        });
        try {
          if (category.id) {
            await this.categoryRepository.updatedCategoryTransaction(
              category.id,
              udpatedAmount
            );
          }
        } catch (error) {
          console.error("Error en EventBus UPDATE_CATEGORY listener:", error);
          throw new Error("Ha ocurrido un error al actualizar la transaccion");
        }
      } else if (data.categoryId) {
        const dataToAddTransaction = {
          transactionId: data.transactionId,
          userId: data.userId,
          amount: data.transactionAmount,
          categoryId: data.categoryId,
        };
        EventBus.emit(
          EventTypes.ADD_TRANSACTION_INTO_CATEGORY,
          dataToAddTransaction
        );
      }
    });

    // ELIMINAR TRANSACCION DE CATEGORIA
    EventBus.on(EventTypes.DELETE_TRANSACTION_FROM_CATEGORY, async (data) => {
      let category;
      try {
        category = await this.categoryRepository.getByTransactionId(
          data.transactionId
        );
      } catch (error) {
        console.error(
          "Error en EventBus DELETE_TRANSACTION_FROM_CATEGORY listener:",
          error
        );
        throw new Error("Ha ocurrido un error al obtener la transaccion");
      }
      if (category.transactions) {
        const index = category.transactions.indexOf(
          data.transactionId as ObjectId & ITransaccionModel
        );
        category.transactions.splice(index, 1);
      }

      category.currentAmount -= data.amount;
      try {
        await this.categoryRepository.updateCategory(category);
      } catch (error) {
        console.error("Error en EventBus UPDATE_CATEGORY listener:", error);
        throw new Error("Ha ocurrido un error al actualizar la transaccion");
      }
      if (category.id) {
        EventBus.emit(EventTypes.UPDATED_BUDGET, {
          categoryId: category.id as ObjectId,
        });
      }
    });
  }
}

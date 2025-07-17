import { ObjectId } from "mongoose";
import EventBus from "../../../common/eventBus.ts";
import { EventTypes } from "../../../common/eventTypes.ts";
import BudgetRepository from "../repository/budgetRepository.ts";
import { formToEntityBudget, type IBudgetForm } from "../utils/budgetMapper.ts";
import { categoryContainer } from "../../Category/categoryModule.ts";

export default class BudgetService {
  private budgetRepository: BudgetRepository;

  constructor(budgetRepository: BudgetRepository) {
    this.budgetRepository = budgetRepository;
    EventBus.on(EventTypes.UPDATE_AFTER_CREATE_BUDGET, async (data) => {
      try {
        await this.budgetRepository.updateAfterCreate(data);
      } catch (error) {
        console.error(
          "Error en EventBus UPDATE_AFTER_CREATE_BUDGET listener:",
          error
        );
        throw new Error("Ha ocurrido un error al actualizar el presupuesto");
      }
    });

    EventBus.on(EventTypes.UPDATED_BUDGET, async (data) => {
      try {
        await this.budgetRepository.updateBudgetProgress(data);
      } catch (error) {
        console.error("Error EventBus UPDATED_BUDGET listener:", error);
        throw new Error("Ha ocurrido un error al actualizar el presupuesto");
      }
    });
  }
  public async getAll(userId: ObjectId) {
    try {
      return await this.budgetRepository.getAll(userId);
    } catch (error) {
      console.error("Error en getAll:", error);
      throw new Error("Ha ocurrido un error al obtener el presupuesto");
    }
  }

  public async save(formData: IBudgetForm, userId: ObjectId) {
    let data;
    try {
      const newbudget = formToEntityBudget(formData, userId);
      const budgetId = await this.budgetRepository.save(newbudget);
      data = {
        budgetId: budgetId,
        userId: userId,
        categoriesData: {
          categoriesLimits: formData["category-limit"],
          categoriesDescriptions: formData["category-description"],
          categoriesTypes: formData["category-type"],
          categoriesColor: formData["category-color"],
        },
      };
    } catch (error) {
      console.error("Error en save:", error);
      throw new Error("Ha ocurrido un error al guardar el presupuesto");
    }
    EventBus.emit(EventTypes.CREATE_CATEGORY, data);
  }

  public async deleteBudget(id: string) {
    try {
      const categoriesId = await this.budgetRepository.deleteBudget(id);
      if (categoriesId) {
        const data = {
          categoriesId: categoriesId,
        };
        // Delete categories
        EventBus.emit(EventTypes.DELETE_CATEGORIES, data)
      } 
    } catch (error) {
      console.error("Error en delete:", error);
      throw new Error("Ha ocurrido un error al eliminar el presupuesto");
    }
  }

  public async updateStatus(budgetId: string, budgetStatus: boolean){
    try{
      await this.budgetRepository.updateStatus(budgetId, budgetStatus)
    } catch(error){
      console.error("Error en updateStatus:", error);
      throw new Error("Ha ocurrido un error al actualizar el estado del presupuesto");
    }
  }
}

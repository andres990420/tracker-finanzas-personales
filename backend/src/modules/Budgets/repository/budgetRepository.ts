import { Model, ObjectId } from "mongoose";
import type {
  IBudgetModel,
  IBudgetModelPopulated,
} from "../model/budgetModel.ts";
import Budget from "../entity/budgetEntity.ts";
import { modelToEntityBudget } from "../utils/budgetMapper.ts";
import { type UpdatedBusgetPayloads } from "../../../common/eventPayloads.ts";
import { categoryContainer } from "../../Category/categoryModule.ts";

export default class BudgetRepository {
  private BudgetModel: Model<IBudgetModel>;

  constructor(budgetModel: Model<IBudgetModel>) {
    this.BudgetModel = budgetModel;
  }

  public async getAll(userId: ObjectId) {
    try {
      const allBudgets = (await this.BudgetModel.find({ user: userId })
        .populate("categories")
        .exec()) as unknown as IBudgetModelPopulated[];
      return allBudgets.map((budget) => modelToEntityBudget(budget));
    } catch (error) {
      console.error("Error en getAll:", error);
      throw new Error(
        "Ha ocurrido un error al recuperar la lista de presupuestos"
      );
    }
  }

  public async save(budget: Budget) {
    const model = new this.BudgetModel({
      name: budget.name,
      categories: budget.categories,
      currentAmount: budget.currentAmount,
      maxAmount: budget.maxAmount,
      user: budget.user,
      isFinish: budget.isFinish
    });
    try {
      await model.save();
      return model.id as ObjectId;
    } catch (error) {
      console.error("Error en save:", error);
      throw new Error("Ha ocurrido un error al guardar el presupuesto");
    }
  }

  public async updateAfterCreate(data: any) {
    const categories = { categories: data.categoriesId };
    try {
      await this.BudgetModel.findByIdAndUpdate(data.budgetId, categories);
    } catch (error) {
      console.error("Error en updatedAfterCreate", error);
      throw new Error("Ha ocurrido un erro al actualizar el presupuesto");
    }
  }

  public async updateBudgetProgress(data: UpdatedBusgetPayloads) {
    let budget;
    try {
      budget = (await this.BudgetModel.findOne({
        categories: data.categoryId,
      })
        .populate("categories")
        .exec()) as unknown as IBudgetModelPopulated;

      if (!budget) {
        throw new Error(
          `Presupuesto con el id ${data.categoryId} no encontrado`
        );
      }
    } catch (error) {
      throw new Error(
        "Ha ocurrido al obtener el presupuesto en la base de datos"
      );
    }
    let newCurrenteAmount: number = 0;
    budget.categories.map((category) => {
      newCurrenteAmount += category.currentAmount;
    });
    try {
      await this.BudgetModel.findByIdAndUpdate(budget?.id, {
        currentAmount: newCurrenteAmount,
      });
    } catch {
      throw new Error("Ha ocurrido un error al actualizar el presupuesto");
    }
  }

  public async deleteBudget(budgetId: string) {
    try {
      const budget = await this.BudgetModel.findById(budgetId);
      if (budget) {
        await this.BudgetModel.deleteOne({_id: budget.id})
        if (budget.categories) {
          return budget.categories;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error en delete:', error)
      throw new Error("Ha oucrrido un error al elimnar el presupueto");
    }
  }

  public async updateStatus(budgetId: string, budgetStatus: boolean){
    try{
      await this.BudgetModel.findByIdAndUpdate(budgetId, {isFinish: budgetStatus})
    } catch(error){
      console.error('Error en updateStatus:', error)
      throw new Error("Ha oucrrido un error al actualizar el estado del presupueto");
    }
  }
}

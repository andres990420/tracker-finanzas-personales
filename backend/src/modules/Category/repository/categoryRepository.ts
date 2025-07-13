import Category, { type ICategory } from "../entity/categoryEntity.ts";
import type { ICategoryModel } from "../../Category/model/categoryModel.ts";
import { Model, ObjectId } from "mongoose";
import type { AddMovementIntoCategoryPayloads } from "../../../common/eventPayloads.ts";
import {
  type ICategoryPopulated,
  modelToEntityCategory,
  modelToEntityCategoryPopulated,
} from "../utils/categoryMapper.ts";

export default class CategoryRepository {
  private CategoryModel: Model<ICategoryModel>;
  constructor(categoryModel: Model<ICategoryModel>) {
    this.CategoryModel = categoryModel;
  }

  public async findAll() {
    try {
      const categories = await this.CategoryModel.find();
      if (!categories) {
        throw new Error("Categorias no encontradas");
      }
      return categories;
    } catch (error) {
      console.error("Error en findAll:", error);
      throw new Event("Ha ocurrido un error al recuperar las categorias");
    }
  }

  public async getbyTransactionIdPopulated(transactionId: ObjectId) {
    try {
      const category = await this.CategoryModel.findOne({
        transactions: transactionId,
      })
        .populate({path:"transactions", strictPopulate: false})
        .exec();

      if (!category) {
        new Error(
          `No se ha encontrado la categoria con transaccion de id: ${transactionId}`
        );
        return null;
      } else {
        return modelToEntityCategoryPopulated(category as ICategoryPopulated);
      }
    } catch (error) {
      console.error("Error en getbyTransactionIdPopulated:", error);
      throw new Error("Error al buscar la categoria en la base de datos");
    }
  }

  public async save(categories: Array<ICategory>) {
    try {
      const categoriesSaved = await this.CategoryModel.insertMany(categories);
      const categoriesIDs = categoriesSaved.map((category) => category.id);
      return categoriesIDs as ObjectId[];
    } catch (error) {
      console.error("Error en save:", error);
      throw new Error("Ha ocurrido un error al guardar las categorias");
    }
  }

  public async addCategoryTransaction(data: AddMovementIntoCategoryPayloads) {
    let category;
    try {
      category = await this.CategoryModel.findById(data.categoryId);
      if (!category) {
        throw new Error(`Categoria con id ${data.categoryId} no encontrado`);
      }
    } catch (error) {
      console.error("Error en addCategoryTransaction:", error);
      throw new Error(
        "Ha ocurrido un error al encontrar categoria en la base de datos"
      );
    }
    const newCurrentAmount = data.amount + (category.currentAmount as number);
    const totalTransactions = [...category.transactions, data.transactionId];
    try {
      await this.CategoryModel.findByIdAndUpdate(category.id, {
        currentAmount: newCurrentAmount,
        transactions: totalTransactions,
      });
    } catch (error) {
      console.error("Error en addCategoryTransaction:", error);
      throw new Error(
        "Ha ocurrido un error al intentar actualizar la categoria en la base datos"
      );
    }
  }

  public async updatedCategoryTransaction(
    categoryId: ObjectId,
    newAmount: number
  ) {
    try {
      await this.CategoryModel.findByIdAndUpdate(categoryId, {
        currentAmount: newAmount,
      });
    } catch (error) {
      console.error("Error en updatedCategoryTransaction:", error);
      throw new Event("No se ha podido actualizaar la categoria");
    }
  }

  public async getByTransactionId(transactionId: ObjectId) {
    try {
      const category = await this.CategoryModel.findOne({
        transactions: transactionId as ObjectId,
      });
      if (!category) {
        throw new Error(
          `No se ha encontrado la categoria con transaccion de id ${transactionId}`
        );
      }
      return modelToEntityCategory(category as unknown as ICategoryModel);
    } catch (error) {
      console.error("Error getByTransactionId:", error);
      throw new Error(
        "Ha ocurrido un error al recuperar la categoria en la base de datos"
      );
    }
  }

  public async updateCategory(category: Category) {
    try {
      await this.CategoryModel.findByIdAndUpdate(category.id, category);
    } catch (error) {
      console.error("Error en updateCategory:", error);
      throw new Error(
        "Ha ocurrido un error al intentar actualizar la categoria"
      );
    }
  }

  public async deleteCategory(categoryId: ObjectId | ObjectId[]){
    try{
      await this.CategoryModel.deleteMany({_id: {$in: categoryId}})
    } catch (error){
      console.error("Error en deleteCategory:", error);
      throw new Error(
        "Ha ocurrido un error al intentar eliminar la categoria"
      );
    }
  }
}

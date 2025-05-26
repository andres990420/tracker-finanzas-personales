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
    const categories = await this.CategoryModel.find();
    return categories;
  }

  public async getbyTransactionIdPopulated(transactionId: ObjectId) {
    const category = await this.CategoryModel.findOne({
      transactions: transactionId,
    })
      .populate("Transaction")
      .exec();

    return modelToEntityCategoryPopulated(category as ICategoryPopulated);
  }

  public async save(categories: Array<ICategory>) {
    const categoriesSaved = await this.CategoryModel.insertMany(categories);
    const categoriesIDs = categoriesSaved.map((category) => category.id);
    return categoriesIDs as ObjectId[];
  }

  public async addCategoryTransaction(data: AddMovementIntoCategoryPayloads) {
    const category = await this.CategoryModel.findById(data.categoryId);
    if (!category) {
      throw new Error(`Category with id ${data.categoryId} not found`);
    }
    const newCurrentAmount = data.amount + (category.currentAmount as number);
    const totalTransactions = [...category.transactions, data.transactionId];
    await this.CategoryModel.findByIdAndUpdate(category.id, {
      currentAmount: newCurrentAmount,
      transactions: totalTransactions,
    });
  }

  public async updatedCategoryTransaction(
    categoryId: ObjectId,
    newAmount: number
  ) {
    await this.CategoryModel.findByIdAndUpdate(categoryId, {
      currentAmount: newAmount,
    });
  }

  public async getByTransactionId(transactionId: ObjectId) {
    const category = await this.CategoryModel.findOne({transactions: transactionId as ObjectId});
    if (!category){
      throw new Error('No se ha encontrado la categoria')
    }
    return modelToEntityCategory(category as unknown as ICategoryModel)
  }

  public async updateCategory(category : Category){
    await this.CategoryModel.findByIdAndUpdate(category.id, category)
  }
}

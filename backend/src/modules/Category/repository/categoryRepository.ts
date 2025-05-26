import Category, { type ICategory } from "../entity/categoryEntity.ts";
import type { ICategoryModel } from "../../Category/model/categoryModel.ts";
import { Model, ObjectId } from "mongoose";
import type { AddMovementIntoCategoryPayloads } from "../../../common/eventPayloads.ts";

export default class CategoryRepository {
  private CategoryModel: Model<ICategoryModel>;
  constructor(categoryModel: Model<ICategoryModel>) {
    this.CategoryModel = categoryModel;
  }

  public async findAll() {
    const categories = await this.CategoryModel.find();
    return categories;
  }

  public async save(categories: Array<ICategory>) {
    const categoriesSaved = await this.CategoryModel.insertMany(categories);
    const categoriesIDs = categoriesSaved.map((category) => category.id);
    return categoriesIDs as ObjectId[];
  }

  public async updateCategoryTransaction(
    data: AddMovementIntoCategoryPayloads
  ) {
    const category = await this.CategoryModel.findById(data.categoryId);
    if (!category) {
      throw new Error(`Category with id ${data.categoryId} not found`);
    }
    const newCurrentAmount = data.amount + (category.currentAmount as number);
    const totalTransactions = [...category.transactions, data.transactionId]
    await this.CategoryModel.findByIdAndUpdate(category.id, { currentAmount: newCurrentAmount, transactions: totalTransactions});

  }
}

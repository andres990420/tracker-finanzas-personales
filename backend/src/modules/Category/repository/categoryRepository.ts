import Category, { type ICategory } from "../entity/categoryEntity.ts";
import type { ICategoryModel } from "../../Category/model/categoryModel.ts";
import { Model } from "mongoose";

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
    return categoriesIDs;
  }
}

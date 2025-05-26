import { ObjectId , Model} from "mongoose";
import Category, { type ICategory } from "../entity/categoryEntity.ts";
import type { ICategoryModel } from "../model/categoryModel.ts";
import { categoryContainer } from "../categoryModule.ts";
import type { ITransaccionModel } from "../../Movements/model/transactionModel.ts";
import Transaction from "../../Movements/entity/transactionEntity.ts";

interface ICategoryForm {
  categoryTypes: Array<string> | string;
  categoryLimits: Array<number>;
  categoryColor: Array<string> | string;
  categoryDescription: Array<string> | string;
}

export interface ICategoryPopulated{
  id: ObjectId
  user: ObjectId;
  type: string;
  currentAmount: number;
  maxAmount: number;
  color: string;
  description: string;
  transactions: ITransaccionModel[];
  createdAt: Date;
  updatedAt: Date;
}

export function formToEntityCategory(data: ICategoryForm, userId: ObjectId): Array<ICategory> {
  const categories: Array<ICategory> = [];

  if (typeof data.categoryTypes === "object") {
    const categoriesConverted = convertingMultiCategories(data, userId);
    categoriesConverted.map((category) => categories.push(category));
  } else {
    const category = convertingOneCategory(data, userId);
    categories.push(category);
  }

  return categories;
}

function convertingOneCategory(data: ICategoryForm, userId: ObjectId): Category {
  return new Category(
    data.categoryTypes as string,
    Number(data.categoryLimits),
    0,
    data.categoryColor as string,
    data.categoryDescription as string,
    userId
  );
}

function convertingMultiCategories(data: ICategoryForm, userId: ObjectId): Array<Category> {
  const categories: Array<Category> = [];

  for (let i = 0; i < data.categoryTypes.length; i++) {
    const category = new Category(
      data.categoryTypes[i],
      Number(data.categoryLimits[i]),
      0,
      data.categoryColor[i],
      data.categoryDescription[i],
      userId
    );

    categories.push(category);
  }
  return categories;
}

export function modelToEntityCategory(data: ICategoryModel){
  const category = new Category(
    data.type,
    data.maxAmount,
    data.currentAmount,
    data.color,
    data.description,
    data.user,
    data.id,
    data.createdAt,
    data.updatedAt,
    data.transactions
  )
  return category
}

export function modelToEntityCategoryPopulated(data: ICategoryPopulated){
  const category = new Category(
    data.type,
    data.maxAmount,
    data.currentAmount,
    data.color,
    data.description,
    data.user,
    data.id,
    data.createdAt,
    data.updatedAt,
    data.transactions
  )
  return category
}
import type { ICategory } from "../entity/categoryEntity.ts";
import Budget from "../entity/budgetEntity.ts";
import type { IBudgetModel, IBudgetModelPopulated } from "../model/budgetModel.ts";
import { ObjectId } from "mongoose";
import Category from "../entity/categoryEntity.ts";

interface IBudgetForm {
  "budget-name": string;
  "category-type": Array<string> | string;
  "category-limit": Array<string>;
  "category-color": Array<string> | string;
  "category-description": Array<string> | string;
}

export function extractingCategoriesToBeSave(
  data: IBudgetForm
): Array<ICategory> {
  const categories: Array<ICategory> = [];

  if (typeof data["category-type"] === "object") {
    const categoriesConverted = convertingMultiCategories(data);
    categoriesConverted.map((category) => categories.push(category));
  } else {
    const category = convertingOneCategory(data);
    categories.push(category);
  }

  return categories;
}

export function modelToEntityBudget(data: IBudgetModelPopulated): Budget {
  let categories = data.categories.map(category=>
    new Category(
      category.type,
      category.maxAmount,
      category.currentAmount,
      category.color,
      category.description,
      category.id,
      category.createdAt,
      category.updatedAt,
      category.user
    )
  );
  console.log(categories);
  return new Budget(
    data.name,
    data.currentAmount,
    data.maxAmount,
    categories,
    data.createdAt,
    data.updatedAt,
    data.id,
    data.user
  );
}

export function formToEntityBudget(
  data: IBudgetForm,
  categories: Array<ObjectId>
): Budget {
  let budgetLimit: number = 0;
  if (typeof data["category-limit"] === "object") {
    data["category-limit"].map((limit) => (budgetLimit += Number(limit)));
  } else {
    budgetLimit += data["category-limit"];
  }

  return new Budget(data["budget-name"], 0, budgetLimit, categories);
}

function convertingOneCategory(data: IBudgetForm) : Category{
  return new Category(
    data["category-type"] as string,
    Number(data["category-limit"]),
    0,
    data["category-color"] as string,
    data["category-description"] as string
  );
}

function convertingMultiCategories(data: IBudgetForm) : Array<Category> {
  const categories: Array<ICategory> = [];

  for (let i = 0; i < data["category-type"].length; i++) {
    const category = new Category(
      data["category-type"][i],
      Number(data["category-limit"][i]),
      0,
      data["category-color"][i],
      data["category-description"][i]
    );

    categories.push(category);
  }
  return categories;
}

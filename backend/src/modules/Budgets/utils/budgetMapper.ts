import type { ICategory } from "../entity/categoryEntity.ts";
import Budget from "../entity/budgetEntity.ts";
import type { IBudgetModel } from "../model/budgetModel.ts";
import { ObjectId } from "mongoose";

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

export function modelToEntityBudget(data: IBudgetModel): Budget {
  return new Budget(
    data.name,
    data.currentAmount,
    data.maxAmount,
    data.categories,
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

function convertingOneCategory(data: IBudgetForm) {
  const category: ICategory = {
    type: "",
    currentAmount: 0,
    maxAmount: 0,
    color: "",
    description: "",
  };

  category.type = data["category-type"] as string;
  category.currentAmount = 0;
  category.maxAmount = Number(data["category-limit"]);
  category.color = data["category-color"] as string;
  category.description = data["category-description"] as string;

  return category;
}

function convertingMultiCategories(data: IBudgetForm) {
  const categories: Array<ICategory> = [];

  for (let i = 0; i < data["category-type"].length; i++) {
    const category: ICategory = {
      type: "",
      currentAmount: 0,
      maxAmount: 0,
      color: "",
      description: "",
    };

    category.type = data["category-type"][i];

    category.currentAmount = 0;
    category.maxAmount = Number(data["category-limit"][i]);

    category.color = data["category-color"][i];

    category.description = data["category-description"][i];

    categories.push(category);
  }
  return categories;
}

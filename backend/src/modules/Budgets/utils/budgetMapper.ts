import Budget from "../entity/budgetEntity.ts";
import type {
  IBudgetModel,
  IBudgetModelPopulated,
} from "../model/budgetModel.ts";
import { ObjectId } from "mongoose";
import Category from "../../Category/entity/categoryEntity.ts";

export interface IBudgetForm {
  "budget-name": string;
  "category-type": Array<string> | string;
  "category-limit": Array<number>;
  "category-color": Array<string> | string;
  "category-description": Array<string> | string;
}

export function modelToEntityBudget(data: IBudgetModelPopulated): Budget {
  let categories = data.categories.map(
    (category) =>
      new Category(
        category.type,
        category.maxAmount,
        category.currentAmount,
        category.color,
        category.description,
        category.user,
        category.id,
        category.createdAt,
        category.updatedAt,
        category.transactions
      )
  );
  return new Budget(
    data.name,
    data.currentAmount,
    data.maxAmount,
    data.user,
    data.isFinish,
    categories,
    data.createdAt,
    data.updatedAt,
    data.id
  );
}

export function formToEntityBudget(
  data: IBudgetForm,
  userId: ObjectId
): Budget {
  let budgetLimit: number = 0;
  if (typeof data["category-limit"] === "object") {
    data["category-limit"].map((limit) => (budgetLimit += Number(limit)));
  } else {
    budgetLimit += data["category-limit"];
  }

  return new Budget(data["budget-name"], 0, budgetLimit, userId, false);
}

// export function EntityBudget(
//   data: IBudgetForm,
//   categories: Array<ObjectId>,
//   userId: ObjectId
// ): Budget {
//   let budgetLimit: number = 0;
//   if (typeof data["category-limit"] === "object") {
//     data["category-limit"].map((limit) => (budgetLimit += Number(limit)));
//   } else {
//     budgetLimit += data["category-limit"];
//   }

//   return new Budget(
//     data["budget-name"],
//     0,
//     budgetLimit,
//     userId,
//     false,
//     categories
//   );
// }

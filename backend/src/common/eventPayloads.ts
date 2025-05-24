import { ObjectId } from "mongoose";
import { EventTypes } from "./eventTypes.ts";

export interface AddMovementIntoCategoryPayloads {
  transactionId: ObjectId | undefined;
  amount: number;
  categoryId: ObjectId;
}

export interface UpdatedBusgetPayloads {
  categoryId: ObjectId;
  currentAmount: number;
  // budgetId: ObjectId;
}

export interface CreateCategoryPayloads {
  budgetId: ObjectId
  categoriesData: {
    categoriesLimits: number[];
    categoriesDescriptions: string[] | string;
    categoriesTypes: string[] | string;
    categoriesColor: string[] | string;
  };
}

export interface CreateBudgetPayloads {
  categoriesId: ObjectId[];
  budgetId: ObjectId
}

export interface EventPayloadMaps {
  [EventTypes.ADD_TRANSACTION_INTO_CATEGORY]: AddMovementIntoCategoryPayloads;
  [EventTypes.UPDATED_BUDGET]: UpdatedBusgetPayloads;
  [EventTypes.CREATE_CATEGORY]: CreateCategoryPayloads;
  [EventTypes.CREATE_BUDGET]: CreateBudgetPayloads;
}

import { ObjectId } from "mongoose";
import { EventTypes } from "./eventTypes.ts";

export interface AddMovementIntoCategoryPayloads {
  transactionId: ObjectId | undefined;
  userId: ObjectId;
  amount: number;
  categoryId: ObjectId;
}

export interface UpdatedBusgetPayloads {
  categoryId: ObjectId;
  currentAmount: number;
  // budgetId: ObjectId;
}

export interface CreateCategoryPayloads {
  budgetId: ObjectId;
  userId: ObjectId;
  categoriesData: {
    categoriesLimits: number[];
    categoriesDescriptions: string[] | string;
    categoriesTypes: string[] | string;
    categoriesColor: string[] | string;
  };
}

export interface UpdatedAfterCreateBudgetPayloads {
  categoriesId: ObjectId[];
  budgetId: ObjectId;
}

export interface EventPayloadMaps {
  [EventTypes.ADD_TRANSACTION_INTO_CATEGORY]: AddMovementIntoCategoryPayloads;
  [EventTypes.UPDATED_BUDGET]: UpdatedBusgetPayloads;
  [EventTypes.CREATE_CATEGORY]: CreateCategoryPayloads;
  [EventTypes.UPDATE_AFTER_CREATE_BUDGET]: UpdatedAfterCreateBudgetPayloads;
}

import { ObjectId } from "mongoose";
import { EventTypes } from "./eventTypes.ts";

export interface AddMovementIntoCategoryPayloads {
  transactionId: ObjectId | undefined;
  userId: ObjectId;
  amount: number;
  categoryId: ObjectId | undefined; 
}

export interface UpdatedBusgetPayloads {
  categoryId: ObjectId | undefined;
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

export interface UpdateCategoryPayloads {
  transactionAmount: number;
  transactionId: ObjectId;
  userId: ObjectId;
  categoryId?: ObjectId | undefined
}

export interface UpdatedAfterCreateBudgetPayloads {
  categoriesId: ObjectId[];
  budgetId: ObjectId;
}

export interface DeleteTransactionFromCategory {
  transactionId: ObjectId;
  amount: number
}

export interface DeleteCategories{
  categoriesId: ObjectId[] | ObjectId
}

export interface EventPayloadMaps {
  [EventTypes.ADD_TRANSACTION_INTO_CATEGORY]: AddMovementIntoCategoryPayloads;
  [EventTypes.UPDATED_BUDGET]: UpdatedBusgetPayloads;
  [EventTypes.CREATE_CATEGORY]: CreateCategoryPayloads;
  [EventTypes.UPDATE_AFTER_CREATE_BUDGET]: UpdatedAfterCreateBudgetPayloads;
  [EventTypes.UPDATE_CATEGORY]: UpdateCategoryPayloads;
  [EventTypes.DELETE_TRANSACTION_FROM_CATEGORY]: DeleteTransactionFromCategory;
  [EventTypes.DELETE_CATEGORIES] : DeleteCategories;
}

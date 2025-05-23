import { ObjectId } from "mongoose";
import { EventTypes } from "./eventTypes.ts";

export interface AddMovementIntoCategoryPayloads{
    movementId : ObjectId,
    amount: number
}

export interface UpdatedBusgetPayloads{
    categoryId: ObjectId,
    currentAmount: number
}

export interface EventPayloadMaps{
    [EventTypes.ADD_MOVEMENT_INTO_CATEGORY]: AddMovementIntoCategoryPayloads
    [EventTypes.UPDATED_BUDGET]: UpdatedBusgetPayloads
}

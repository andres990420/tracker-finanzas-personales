import MovementRepository from "../repository/movementRepository.ts";

export default class MovementService{
    private movementRepository: MovementRepository
    constructor(
        movementRepository: MovementRepository
    ){
        this.movementRepository = movementRepository
    }
}
import Budget,{type ICategory } from "../entity/budgetEntity.ts"

interface IBudgetForm{
    "budget-name": string,
    "category-type": Array<string>
    "category-limit": Array<string>
    "category-color": Array<string>
    "category-description": Array<string>
}


export function formToEntity(data: IBudgetForm): Budget{
   
    const categories = []
    let budgetLimit = 0;
    
    for(let i=0 ; i < data["category-type"].length; i++){
        const category : ICategory = {
            "type": '',
            "currentAmount": 0,
            "maxAmount": 0,
            "color" : '',
            "description": ''
        }
        category.type = data["category-type"][i];
        category.currentAmount = 0;
        category.maxAmount = Number(data["category-limit"][i]);
        category.color = data["category-color"][i];
        category.description = data["category-description"][i];
        
        budgetLimit += Number(data["category-limit"][i]);

        categories.push(category);
    }
   
    return new Budget(
        data["budget-name"],
        0,
        budgetLimit,
        categories
    ) 
}



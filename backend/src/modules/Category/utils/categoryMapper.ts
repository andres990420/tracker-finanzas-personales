import Category, { type ICategory } from "../entity/categoryEntity.ts";

interface ICategoryForm {
  categoryTypes: Array<string> | string;
  categoryLimits: Array<number>;
  categoryColor: Array<string> | string;
  categoryDescription: Array<string> | string;
}

export function formToEntityCategory(data: ICategoryForm): Array<ICategory> {
  const categories: Array<ICategory> = [];

  if (typeof data.categoryTypes === "object") {
    const categoriesConverted = convertingMultiCategories(data);
    categoriesConverted.map((category) => categories.push(category));
  } else {
    const category = convertingOneCategory(data);
    categories.push(category);
  }

  return categories;
}

function convertingOneCategory(data: ICategoryForm): Category {
  return new Category(
    data.categoryTypes as string,
    Number(data.categoryLimits),
    0,
    data.categoryColor as string,
    data.categoryDescription as string
  );
}

function convertingMultiCategories(data: ICategoryForm): Array<Category> {
  const categories: Array<Category> = [];

  for (let i = 0; i < data.categoryTypes.length; i++) {
    const category = new Category(
      data.categoryTypes[i],
      Number(data.categoryLimits[i]),
      0,
      data.categoryColor[i],
      data.categoryDescription[i]
    );

    categories.push(category);
  }
  return categories;
}

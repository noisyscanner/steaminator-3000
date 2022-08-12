export type Drink = {
  id: string;
  name: string;
  thumb: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  instructions: string;
};

export type IngredientMap = Record<string, string>;

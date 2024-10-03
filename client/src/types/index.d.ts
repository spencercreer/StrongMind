export interface Pizza {
  _id?: string;
  name: string;
  toppings: Topping[];
}

export interface Topping {
  _id?: string;
  name: string;
}

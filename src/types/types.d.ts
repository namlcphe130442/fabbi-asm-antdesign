type Meal = {
  id: number,
  name: string,
}

type Order = {
  id: string,
  name: string|null,
  numOfDish: number,
}

type Dish = {
  id: number,
  name: string,
  restaurant: string,
  availableMeals: Array<string>,
}

interface OrderDetail {
  meal: Meal,
  people: number,
  restaurant: string,
  dishes: Array<Order>,
}
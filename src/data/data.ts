import DataJson from './dishes.json';

var steps = ['Step 1', 'Step 2', 'Step 3', 'Review'];
export const STEPS = steps;

var order_Detail: OrderDetail = {meal: {id: 0, name: ''}, people: 1, restaurant: '', dishes: []};
localStorage.setItem('OrderDetail', JSON.stringify(order_Detail));
var meals = [
    {
      id: 1,
      name: "breakfast",
    },
    {
      id: 2,
      name: "lunch",
    },
    {
      id: 3,
      name: "dinner",
    },
];
export const MEALS = meals;

var dishes: Array<Dish> = DataJson.dishes !== null ? DataJson.dishes : [];
export const DISHES = dishes;

export const formItemLayout = {
  labelCol: {
      xs: {
          span: 40,
      },
      sm: {
          span: 40,
      },
  },
  wrapperCol: {
      xs: {
          span: 24,
      },
      sm: {
          span: 16,
      },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
      xs: {
          span: 24,
          offset: 0,
      },
      sm: {
          span: 16,
          offset: 8,
      },
  },
};



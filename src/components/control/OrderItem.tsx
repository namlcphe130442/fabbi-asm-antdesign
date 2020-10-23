import React, { useState } from 'react';
import { Form, Select, InputNumber, message } from 'antd';

interface Props {
  dishOrder: string[],
  dish: Order,
  orderItems: Order[],
  setOrderItems: React.Dispatch<React.SetStateAction<Order[]>>
}
const s4 = () => {
  return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
}

const generateId = () => {
  return s4() + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4();
}

const OrderItem = ({ dishOrder, dish, orderItems, setOrderItems } : Props) => {
  const [dishValue, setDishValue] = useState(dish.name);
  const [numOfDishValue, setNumOfDishValue] = useState(dish.numOfDish);
  const nameDish = 'dish' + dish.id;
  const nameNo = 'no' + dish.id;

  const handleChangeDish = (value: string|null) => {
    var check = false;
    orderItems.forEach(item => {
      if(item.name === value){
        check = true; 
        return;
      }
    });
    if(check===false){
      dish.name = value;
      setDishValue(value);
    }else{
      message.error("You can't select the same dish twice, rather add more servings.");
      const nameDish = dish.name === '' ? '' : dish.name;
      const newOrderItems = orderItems.map((item: Order) => item);
      newOrderItems.splice(newOrderItems.length - 1, 1);
      const dishNew: Order = { id: generateId() , name: nameDish, numOfDish: dish.numOfDish };
      newOrderItems.push(dishNew);
      console.log(newOrderItems);
      console.log(orderItems);
      setOrderItems(newOrderItems);
    }
  }

  const handleChangeNumber = (value: any) => {
    dish.numOfDish = value;
    setNumOfDishValue(value);
  }

  return (
    <div style={{display:'flex'}}>
      <div style={{width: '60%'}}>
        <h4>Please Select a Dish</h4>
        <Form.Item 
          initialValue={dishValue} 
          name= {nameDish}
          rules={[{ 
            required: true,
            message: 'Please Select a meal' 
          }]}
        >
          <Select onChange={(value: string) => handleChangeDish(value)}>
            {dishOrder.map((item, index) => (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div style={{width: '40%'}}>
        <h4>Please Enter no. of servings</h4>
        <Form.Item
          initialValue={numOfDishValue}
          name={nameNo}
          rules={[
            {
              required: true,
              message: 'Please Enter Number of people',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if ((value <= 10 && value >= 1)) {
                  return Promise.resolve();
                }
                return Promise.reject('Input the number of people (maximum 10)');
              },
            }),
          ]}
        >
          <InputNumber type="number" onChange={(value: any) => handleChangeNumber(value)}/>
        </Form.Item>
      </div>
    </div>
  );
}

export default OrderItem;
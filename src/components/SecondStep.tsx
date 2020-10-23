import React from 'react';
import { Form, Select, Button, Row, Col } from 'antd';

import ButtonControl from './control/ButtonControl';
import * as data from './../data/data';

interface Props {
  current: number;
  steps: string[];
  setCurrent:React.Dispatch<React.SetStateAction<number>>;
}
const getRestaurant = ( mealName: string ) => {
  var restaurants: Array<string> = [];
  data.DISHES.forEach(dish => {
    if(!restaurants.includes(dish.restaurant) && dish.availableMeals.includes(mealName))
      restaurants.push(dish.restaurant); 
  });
  return restaurants;
}

const SecondStep = ({ current, steps, setCurrent} : Props) => {
  const [form] = Form.useForm();
  const dataLocal :string|null = localStorage.getItem('OrderDetail');
  const orderDetail: OrderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;
  var restaurant = '';
  var restaurants: Array<string> = getRestaurant(orderDetail.meal.name);

  const next = () =>{
    setCurrent(current + 1);
  }

  const prev = () =>{
    orderDetail.restaurant = restaurant === '' ? orderDetail.restaurant : restaurant;
    localStorage.setItem('OrderDetail', JSON.stringify(orderDetail));
    setCurrent(current - 1);
  }

  const onFinish = (value: {restaurant_choice: string}) => {
    if(orderDetail.restaurant !== value.restaurant_choice){
      orderDetail.dishes = [];
    }
    orderDetail.restaurant = value.restaurant_choice;
    localStorage.setItem('OrderDetail', JSON.stringify(orderDetail));
    next();
  };

  const onChangeRestaurant = (value: string) =>{
    restaurant = value;
  }

  return (
    <>
      <Row>
        <Col span={10} offset={6}>
          <Form
            {...data.formItemLayout}
            form={form}
            onFinish={onFinish}
            scrollToFirstError
            className="steps-content"
          >
            <h4>* Please Select a Restaurant</h4>
            <Form.Item 
              initialValue={orderDetail.restaurant} 
              name="restaurant_choice" 
              rules={[{ 
                required: true,
                message: 'Please Select a Restaurant' 
              }]}
            >
              <Select onChange={(value: string) => onChangeRestaurant(value)}>
                {restaurants.map((item, index) => (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item {...data.tailFormItemLayout}  className="steps-action">
              <ButtonControl current={current} steps={steps} prev={prev}/>
              {current < steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              )}  
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default SecondStep;
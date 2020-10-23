import React, { useState } from 'react';
import { Form, Button, Row, Col, message } from 'antd';
import { PlusCircleOutlined } from "@ant-design/icons";

import ButtonControl from './control/ButtonControl';
import * as data from './../data/data';
import OrderItem from './control/OrderItem';

interface Props {
  current: number;
  steps: string[];
  setCurrent:React.Dispatch<React.SetStateAction<number>>;
}

const s4 = () => {
  return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
}

const generateId = () => {
  return s4() + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4()
}

const getDish = (restaurant: string, meal: string) => {
  var dishOrder: Array<string> = [];
  data.DISHES.forEach(dish => {
    if(restaurant === dish.restaurant && dish.availableMeals.includes(meal))
    dishOrder.push(dish.name);
  }); 
  return dishOrder;
}

const ThirdStep = ({ current, steps, setCurrent} : Props) => {
  const [form] = Form.useForm();
  const dataLocal :string|null = localStorage.getItem('OrderDetail');
  const orderDetail: OrderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;
  const [orderItems, setOrderItems] = useState(orderDetail.dishes);
  const [isAdd, setIsAdd] = useState(false);
  var dishOrder: Array<string> = getDish(orderDetail.restaurant, orderDetail.meal.name);

  const next = () =>{
    setCurrent(current + 1);
  }

  const prev = () =>{
    orderDetail.dishes=orderItems;
    localStorage.setItem('OrderDetail', JSON.stringify(orderDetail));
    setCurrent(current - 1);
  }

  const onFinish = () => {
    var error = false;
    var total = 0;
    orderItems.forEach(item => {
      total += +item.numOfDish;
      if(item.name === '' || item.name === null){ error = true;}
    });    
    if(error){
      message.error('Please Select a Dish. Not empty!');
    }else if(total > 10){
      message.error('The total number of dishes should be maximum of 10 is allowed')
    }else if(total < orderDetail.people){
      message.error('The total number of dishes should be greater or equal to the number of people selected in the first step ( >='+orderDetail.people+' )')
    }else{
      orderDetail.dishes=orderItems;
      localStorage.setItem('OrderDetail', JSON.stringify(orderDetail));
      next();
    }    
  };

  const showOrder = () => {
    if(orderItems.length === 0){
      const dishNew: Order = { id: generateId(), name: '', numOfDish: 1 };
      orderItems.push(dishNew);
      setOrderItems(orderItems);
      return <OrderItem orderItems={orderItems} dishOrder={dishOrder} dish={dishNew} setOrderItems={setOrderItems}/>;
    }else{
      return(
        orderItems.map( (dish, index) => (
          <div key={dish.id}>
            <OrderItem key={dish.id} orderItems={orderItems} dishOrder={dishOrder} dish={dish} setOrderItems={setOrderItems}/><br/>
          </div>
        ))
      );
    }
  }

  const handleAddClick = () => {
    var error = false;
    orderItems.forEach(item => {
      if(item.name === '' || item.name === null){ error = true; return;}
    });
    if(error){
      message.error('Please Select a Dish. Not empty!');
    }else{
      if(dishOrder.length === orderItems.length){
        message.error('The restaurant has only '+ dishOrder.length +' suitable dishes for you to choose from');
      }else{
        setIsAdd(!isAdd);
      }
    }
  }

  const add = () => {
    const dishNew: Order = { id: generateId(), name: '', numOfDish: 1 };
    orderItems.push(dishNew);
    setOrderItems(orderItems);
    setIsAdd(false);
    return <OrderItem orderItems={orderItems} dishOrder={dishOrder} dish={dishNew} setOrderItems={setOrderItems}/>;
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
            {
              showOrder()
            }
            {
              (isAdd) && add()
            }
            <Form.Item>
              <PlusCircleOutlined onClick={() => handleAddClick()} />
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

export default ThirdStep;
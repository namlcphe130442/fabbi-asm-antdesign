import React from 'react';
import { Form, Select, Button, Row, Col, InputNumber } from 'antd';

import ButtonControl from './control/ButtonControl';
import * as data from './../data/data';

interface Props {
  current: number;
  steps: string[];
  setCurrent:React.Dispatch<React.SetStateAction<number>>;
}

const FirstStep = ({ current, steps, setCurrent} : Props) => {
  const [form] = Form.useForm();
  const dataLocal :string|null = localStorage.getItem('OrderDetail');
  const orderDetail: OrderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;     

  const next = () =>{
    setCurrent(current + 1);
  }

  const prev = () =>{
    setCurrent(current - 1);
  }

  const onFinish = (value: {meal_choice: string, number_of_people: number}) => {
    if(orderDetail.meal.name !== value.meal_choice){
      orderDetail.restaurant = '';
    }
    orderDetail.meal.name = value.meal_choice;
    orderDetail.people = value.number_of_people;
    localStorage.setItem('OrderDetail', JSON.stringify(orderDetail));    
    next();
  };

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
            <h4>* Please Select a meal</h4>
            <Form.Item 
              initialValue={orderDetail.meal.name} 
              name="meal_choice" 
              rules={[{ 
                required: true,
                message: 'Please Select a meal' 
              }]}
            >
              <Select>
                {data.MEALS.map((item, index) => (
                  <Select.Option key={index} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <h4>* Please Enter Number of people</h4>
            <Form.Item
              initialValue={orderDetail.people === 0 ? 1 : orderDetail.people}
              name="number_of_people"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Number of people',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if ((value <= 10 && value >= 1 && Number.isInteger(value))) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Input the integer number of people (maximum 10)');
                  },
                }),
              ]}
            >
              <InputNumber
                type="number"
                max={10}
                min={1}
              />
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

export default FirstStep;
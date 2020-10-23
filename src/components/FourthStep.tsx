import React from 'react';
import { Row, Col } from 'antd';

import ButtonControl from './control/ButtonControl';

interface Props {
  current: number;
  steps: string[];
  setCurrent:React.Dispatch<React.SetStateAction<number>>;
}

const FourthStep = ({ current, steps, setCurrent} : Props) => {
  const dataLocal :string|null = localStorage.getItem('OrderDetail');
  const orderDetail: OrderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;  

  const prev = () =>{
    setCurrent(current - 1);
  }

  return (
    <div className="steps-content">
      <Row>
        <Col span={12} style={{paddingLeft:'30%'}}>
          <h4>Meal:</h4>
          <h4>No of People:</h4>
          <h4>Restaurant:</h4>
          <h4>Dishes:</h4>
        </Col>
        <Col span={8}>
          <h4>{orderDetail.meal.name}</h4>
          <h4>{orderDetail.people}</h4>
          <h4>{orderDetail.restaurant}</h4>
          <ul style={{border: '1px solid black', marginRight: '50%', padding:'3%', listStyleType: 'none'}}> {orderDetail.dishes.map((item, index) => (
            <li key={index}> <span> {item.name} </span> - <span> {item.numOfDish} </span>  </li>
          ))}
          </ul>
        </Col>
      </Row>
      <div className="steps-action">
        <ButtonControl current={current} steps={steps} prev={prev}/>
      </div>
    </div>
  );
}

export default FourthStep;
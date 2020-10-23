import React, {useState} from 'react';
import { Steps } from 'antd';
import 'antd/dist/antd.css';

import './App.css';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';
import FourthStep from './components/FourthStep';
import * as data from './data/data';

const { Step } = Steps;

const App = () => {

  const steps = data.STEPS;

  const [current, setCurrent] = useState(0);

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <FirstStep current={current} steps={steps} setCurrent={setCurrent}/>;
      case 1:
        return <SecondStep current={current} steps={steps} setCurrent={setCurrent}/>;
      case 2:
        return <ThirdStep current={current} steps={steps} setCurrent={setCurrent}/>;
      default:
        return <FourthStep current={current} steps={steps} setCurrent={setCurrent}/>;
    }
  }

  return (
    <>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item} title={item} />
        ))}
      </Steps>
      <div>{getStepContent(current)}</div>
      {/* <ButtonControl current={current} steps={steps} next={next} prev={prev}/> */}
    </>
    );
  }
  
export default App;
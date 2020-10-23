import React from 'react';
import { Button, message } from 'antd';

interface Props {
  current: number;
  steps: string[];
  prev: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

function ButtonControl({ current, steps, prev } : Props) {
  return (
    <>
      {current === steps.length - 1 && (
        <Button type="primary" onClick={() => message.success('Ordered successfully!')}>
          Done
        </Button>
      )}
      {current > 0 && (
        <Button style={{ margin: '0 8px' }} onClick={prev}>
          Previous
        </Button>
      )}
    </>
  );
}

export default ButtonControl;
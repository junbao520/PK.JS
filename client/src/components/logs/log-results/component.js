import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';

export default (props) => {
  return (
    <Card className="bg-secondary shadow">
      <CardHeader className="bg-white border-0">
        <h3 className="mb-0">搜索结果</h3>
      </CardHeader>
      <CardBody>
        <pre>
          {
            props.logs.map(log => log.string + '\n')
          }
        </pre>
      </CardBody>
    </Card>
  );
}
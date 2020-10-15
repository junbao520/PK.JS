import React from 'react';

import {
  Card,
  CardBody,
  CardHeader
} from 'reactstrap';

export default function() {
  return (
    <Card>
      <CardHeader>
        <h3 className="mb-0">违规行为</h3>
      </CardHeader>
      <CardBody>
        <div className="text-center mt-2 mb-2">
          没有找到!
        </div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-question fa-4x"/>
        </div>
        <div className="text-center mt-2 mb-2">
          该信息似乎不存在.
        </div>
      </CardBody>
    </Card>
  );
}
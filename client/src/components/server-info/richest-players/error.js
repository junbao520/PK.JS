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
        <h3 className="mb-0">财富排行榜</h3>
      </CardHeader>
      <CardBody>
        <div className="text-center mt-2 mb-2">
          错误!
        </div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-exclamation-triangle fa-4x"/>
        </div>
        <div className="text-center mt-2 mb-2">
          出了点问题，呜呜呜...
        </div>
      </CardBody>
    </Card>
  );
}
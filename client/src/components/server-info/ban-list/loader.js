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
        <h3 className="mb-0">封禁列表</h3>
      </CardHeader>
      <CardBody>
        <div className="text-center mt-2 mb-3">
          加载中...
        </div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-circle-notch fa-spin fa-4x" />
        </div>
      </CardBody>
    </Card>
  );
}
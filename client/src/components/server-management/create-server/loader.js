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
        <h3 className="mb-0">创建服务器</h3>
      </CardHeader>
      <CardBody>
        <CardBody>
          <div className="text-center mt-2 mb-3">
            加载中...
          </div>
          <div className="btn-wrapper text-center">
            <i className="fas fa-circle-notch fa-spin fa-4x" />
          </div>
          <div className="text-center mt-3 mb-3">
            这可能需要几分钟时间...
          </div>
        </CardBody>
      </CardBody>
    </Card>
  );
}
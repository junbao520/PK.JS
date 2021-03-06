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
        <h3 className="mb-0">角色信息</h3>
      </CardHeader>
      <CardBody>
        <div className="text-center mt-2 mb-2">
          没有权限!
        </div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-lock fa-4x"/>
        </div>
        <div className="text-center mt-2 mb-2">
          您无权查看此角色信息.
        </div>
      </CardBody>
    </Card>
  );
}
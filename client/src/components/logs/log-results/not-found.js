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
        <h3 className="mb-0">搜索结果</h3>
      </CardHeader>
      <CardBody>
        <div className="text-center mt-2 mb-2">
          没有找到!
        </div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-question fa-4x"/>
        </div>
        <div className="text-center mt-2 mb-2">
          没有此搜索的结果.
        </div>
      </CardBody>
    </Card>
  );
}
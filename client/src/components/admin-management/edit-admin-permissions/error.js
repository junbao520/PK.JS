import React from 'react';

import {
  Card,
  CardBody
} from 'reactstrap';

export default function() {
  return (
    <Card>
      <CardBody>
        <CardBody>
          <div className="text-center mt-2 mb-2">
            错误!
          </div>
          <div className="btn-wrapper text-center">
            <i className="fas fa-exclamation-triangle fa-4x"/>
          </div>
          <div className="text-center mt-2 mb-2">
            出了些问题，呜呜呜...
          </div>
        </CardBody>
      </CardBody>
    </Card>
  );
}
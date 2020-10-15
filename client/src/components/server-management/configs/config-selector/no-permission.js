import React from 'react';

import {
  Input
} from "reactstrap";

export default function() {
  return (
    <Input
      type="select"
      disabled
    >
      <option className="text-default" value={null}>您无权查看此配置...</option>
    </Input>
  );
}
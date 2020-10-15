import React from 'react';

import {
  Button,
  Form,
  Input
} from "reactstrap";

class Component extends React.Component{
  state = {
    guid: '',
    pin: ''
  };

  constructor(){
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();

    this.props.action(this.state);
  }
  
  render(){
    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <label
          className="form-control-label"
        >
          绑定新角色...
        </label>
        <Input
          type="text"
          bsSize="sm"
          className="mb-2"
          placeholder="GUID"
          value={this.state.guid}
          onChange={event => this.setState({ guid: event.target.value })}
        />
        <Input
          type="text"
          bsSize="sm"
          className="mb-2"
          placeholder="PIN"
          value={this.state.pin}
          onChange={event => this.setState({ pin: event.target.value })}
        />
        <Button
          color="primary"
          size="sm"
        >
          绑定角色
        </Button>
      </Form>
    );
  }
}

export default Component;
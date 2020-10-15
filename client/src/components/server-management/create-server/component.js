import React from 'react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Row
} from 'reactstrap';

import { validatorServerName } from 'shared/validators';

class Component extends React.Component{
  state = {
    name: '',
    welcomeMessage: 'Welcome to a PK.js powered server!',
    defaultBankGold: 150000,
    defaultPouchGold: 10000,
    defaultBankLimit: 1000000,
    recordStats: false,
    gameserverRestartCron: '0 6 * * *'
  };
  
  constructor(){
    super();
    
    this.isValid = this.isValid.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }
  
  isValid(){
    return validatorServerName(this.state.name);
  }

  onSubmit(event) {
    event.preventDefault();

    if(!this.isValid()) return;

    this.props.action(this.state);
  }

  render(){
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">创建服务器</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody
          className="bg-secondary shadow"
        >
          <Form
            onSubmit={this.onSubmit}
          >
            <Row>
              <Col>
                <label
                  className="form-control-label"
                >
                  Server Name
                </label>
                <FormGroup>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={this.state.name}
                    onChange={event => this.setState({ name: event.target.value })}
                    invalid={!validatorServerName(this.state.name)}
                  />
                  <FormFeedback>
                    服务器名称不能位空，只能包含字符 A-Z, a-z, 0-9 或 _
                  </FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    欢迎信息
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={this.state.welcomeMessage}
                    onChange={event => this.setState({ welcomeMessage: event.target.value })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    初始银行存款
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={this.state.defaultBankGold}
                    onChange={event => this.setState({ defaultBankGold: parseInt(event.target.value) })}
                  />
                </FormGroup>
              </Col>
              <Col  md="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    初始携带现金
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={this.state.defaultPouchGold}
                    onChange={event => this.setState({ defaultPouchGold: parseInt(event.target.value) })}
                  />
                </FormGroup>
              </Col>
              <Col  md="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    初始银行存款上限
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={this.state.defaultBankLimit}
                    onChange={event => this.setState({ defaultBankLimit: parseInt(event.target.value) })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="custom-control custom-checkbox my-4">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    checked={this.state.recordStats}
                    onChange={event => this.setState({ recordStats: event.target.checked })}
                    id="record-stats"
                  />
                  <label className="custom-control-label" htmlFor="record-stats">
                    记录统计
                  </label>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    重启时间
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={this.state.gameserverRestartCron}
                    onChange={event => this.setState({ gameserverRestartCron: event.target.value })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button
                  color="primary"
                  disabled={!this.isValid()}
                >
                  创建
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default Component;
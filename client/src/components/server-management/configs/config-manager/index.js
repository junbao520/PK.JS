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
} from "reactstrap";

import { validatorServerConfigName } from 'shared/validators';

import ConfigSelector from '../config-selector';
import ConfigEditor from '../config-editor';

class ConfigManager extends React.Component{
  state = {
    config: null,
    newConfigName: ''
  };

  constructor(){
    super();
    this.onNewConfig = this.onNewConfig.bind(this);
  }

  onNewConfig(event){
    event.preventDefault();

    if(!validatorServerConfigName(this.state.newConfigName)) return;

    this.setState({ config: this.state.newConfigName });
  }
  
  render(){
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">配置文件管理</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row className="align-items-center">
            <Col>
              <ConfigSelector
                serverID={this.props.serverID}
                selectedConfig={this.state.config}
                onChange={value => this.setState({ config: value })}
                newConfig={true}
              />
            </Col>
          </Row>
          {
            this.state.config &&
            this.state.config === 'new' &&
            <Form
              onSubmit={this.onNewConfig}
            >
              <Row className="align-items-center mt-2">
                <Col>
                  <label
                    className="form-control-label"
                  >
                    配置名
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={this.state.newConfigName}
                      onChange={event => this.setState({ newConfigName: event.target.value })}
                      invalid={!validatorServerConfigName(this.state.newConfigName)}
                    />
                    <FormFeedback>
                      配置文件不能为空，只能包含字符 A-Z, a-z, 0-9 或 _.
                      它必须以 <code>.txt</code> 作为结尾.
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button
                    color="primary"
                    disabled={!validatorServerConfigName(this.state.newConfigName)}
                  >
                    创建
                  </Button>
                </Col>
              </Row>
            </Form>

          }
          {
            this.state.config &&
            this.state.config !== 'new' &&
            <>
              <hr className="my-4" />
              <h6 className="heading-small text-muted mb-4">
                配置文件
              </h6>
              <ConfigEditor
                serverID={this.props.serverID}
                config={this.state.config}
              />
            </>
          }
        </CardBody>
      </Card>
    );
  }
}

export default ConfigManager;
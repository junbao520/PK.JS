import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Input,
} from 'reactstrap';

import Auth from '../../../utils/auth';

import Layout from '../layout/layout';

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      email: '',
      qq: '',
      pwd: '',
      confirmPwd: '',
    }
    // this.login=()=>{
    //   alert(this.state.userName);
    // }
  }
  // async componentDidMount() {
  //   // check whether user is being redirect from login and process if the case
  //   // const urlParams = new URLSearchParams(window.location.search);
  //   // if (urlParams.get('openid.claimed_id') !== null) {
  //   //   await Auth.attemptAuth(window.location.search);
  //   //   this.props.history.replace('/login');
  //   //   this.setState({});
  //   // }
  // }
  showVal(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }
  renderLoading() {

    return (
      <Layout>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-center mt-2 mb-3">
                Loading...
              </div>
              <div className="btn-wrapper text-center">
                <i className="fas fa-circle-notch fa-spin fa-4x" />
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Layout>
    );
  }

  renderRegisterForm() {
  

    return (
      <Layout>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>注册</small>
              </div>
              <div className="btn-wrapper text-center">

                <Input
                  type="text"
                  bsSize="sm"
                  className="mb-2"
                  placeholder="用户名"
                  onChange={this.showVal.bind(this, "displayName")}
                />
                <Input
                  type="text"
                  bsSize="sm"
                  className="mb-2"
                  placeholder="QQ"
                  onChange={this.showVal.bind(this, "qq")}
                />
                <Input
                  type="text"
                  bsSize="sm"
                  className="mb-2"
                  placeholder="邮箱"
                  onChange={this.showVal.bind(this, "email")}
                />
                <Input
                   type="password"
                  bsSize="sm"
                  className="mb-2"
                  placeholder="密码"
                  onChange={this.showVal.bind(this, "pwd")}
                />
                <Input
                  type="password"
                  bsSize="sm"
                  className="mb-2"
                  placeholder="确认密码"
                  onChange={this.showVal.bind(this, "confirmPwd")}
                />
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={() => { this.registerForm() }}
                >

                  {/* <span className="btn-inner--icon" >
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/steam.svg")}
                    />
                  </span> */}
                  <span className="btn-inner--text">注册</span>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Layout>
    );
  }

  saveToken(yes) {
    Auth.saveToken = yes;
    if (Auth.saveToken) Auth.storeToken();
    this.setState({});
  }
  async registerForm() {

    let msg = '';
    if (this.state.dsplayName == '')
      msg = "请填写用户名";
    if (this.state.email == '' || this.state.email.indexOf("@") == -1)
      msg = "请填写正确邮箱地址";
    if (this.state.qq == '')
      msg = "请填写QQ";
    if (this.state.pwd == '' || this.state.confirmPwd == '')
      msg = "请填写密码";
    if (this.state.pwd != this.state.confirmPwd)
      msg = "密码和确认密码不一致";
    if (this.state.pwd.length < 6)
      msg = "密码长度不能小于6位";
    //校验不通过请
    if (msg != '') {
      alert(msg);
      return;
    }
    delete this.state.confirmPwd;
    let res = await Auth.register(this.state);
    if (res.data == -1) {
      alert("账户已经存在");
    } else {
      this.props.history.replace('/login');
    }
  }
  render() {
    // not logged in,
    // show loading while validating login attempt if callback present
    // or when JWT is stored in localStorage


    // not logged in, show login form

    return this.renderRegisterForm();

  }
}

export default Register;
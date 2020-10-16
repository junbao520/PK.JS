import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Input
} from 'reactstrap';

import Auth from '../../../utils/auth';

import Layout from '../layout/layout';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { dsiplayName: '', pwd: '' }
  }
  showVal(name, e) {
    this.setState({
      [name]: e.target.value
    });
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

  renderLoginForm() {


    return (
      <Layout>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>登录</small>
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
                  type="password"
                  bsSize="sm"
                  className="mb-2"
                  placeholder="密码"
                  onChange={this.showVal.bind(this, "pwd")}
                />
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={() => { this.login() }}
                >

                  {/* <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/steam.svg")}
                    />
                  </span> */}
                  <span className="btn-inner--text">登录</span>
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
  async login() {
    //获取了用户名和密码
    // alert(this.state.userName);
    let res = await Auth.attempLogin(this.state);
    if (res == -1) {
      alert("用户名或者密码错误");
      return;

    }
    this.props.history.push('/');
    this.saveToken(true);
    //await Auth.attemptAuth(window.location.search);
  }

  renderRememberMe() {
    return (
      <Layout>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Remember Me?</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={() => { this.saveToken(false) }}
                >
                  <i className="fas fa-times" />
                  <span className="btn-inner--text">No thanks!</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={() => { this.saveToken(true) }}
                >
                  <i className="fas fa-check" />
                  <span className="btn-inner--text">Yes please!</span>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Layout>
    );
  }

  render() {
    // not logged in,
    // show loading while validating login attempt if callback present
    // or when JWT is stored in localStorage
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openid.claimed_id') !== null ||
      (localStorage.getItem('JWT') !== null && Auth.isLoggedIn === false)) {
      return this.renderLoading();
    }

    // not logged in, show login form
    if (!Auth.isLoggedIn) {
      return this.renderLoginForm();
    }

    // logged in, no remember me status, show remember me form
    if (Auth.isLoggedIn && Auth.saveToken === null) {
      return this.renderRememberMe();
    }

    // logged in, select location to go to
    if (Auth.isLoggedIn && Auth.saveToken !== null) {
      return <Redirect to="/" />;
    }
  }
}

export default Login;
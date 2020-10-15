import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register'

const routes = [
  {
    path: '/',
    exact: true,
    name: "主页",
    icon: "fas fa-home",
    component: Home
  },
  {
    path: '/login',
    exact: true,
    name: "登录",
    icon: "fas fa-key",
    component: Login
  },
  {
    path: '/register',
    exact: true,
    name: "注册",
    icon: "fas fa-key",
    component: Register
  }
];

export default routes;
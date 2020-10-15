import Home from './pages/home';
import Player from './pages/player';
import ServerInfo from './pages/server-info';
import RichestPlayers from './pages/richest-players';

const pathPrefix = '/player';

const routes = [
  {
    path: pathPrefix + '/',
    exact: true,
    name: "主页",
    icon: "fas fa-home",
    component: Home
  },
  {
    path: pathPrefix + '/:serverID/:guid/',
    exact: true,
    name: "玩家",
    icon: "fas fa-user",
    component: Player,
    displayWhenPlayerSelected: true
  },
  {
    path: pathPrefix + '/:serverID/:guid/server',
    exact: true,
    name: "服务器信息",
    icon: "fas fa-server",
    component: ServerInfo,
    displayWhenPlayerSelected: true
  },
  {
    path: pathPrefix + '/:serverID/:guid/richest-players',
    exact: true,
    name: "财富排行榜",
    icon: "fas fa-university",
    component: RichestPlayers,
    displayWhenPlayerSelected: true
  }
];

export default routes;
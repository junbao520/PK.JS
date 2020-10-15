// General Routes
import Home from './pages/home';
import CreateServer from './pages/create-server';
import ItemIDs from './pages/item-ids';

// Server Routes
import Dashboard from './pages/dashboard';
import ServerManagement from './pages/server-management';
import ServerStats from './pages/server-stats';
import Admins from './pages/admins';
import AdminLogs from './pages/admin-logs';
import Players from './pages/players';
import PlayersByIP from './pages/players-by-ip';
import LogSearch from './pages/log-search';
import BanList from './pages/ban-list';
import RichestPlayers from './pages/richest-players';

const pathPrefix = '/admin';

const generalRoutes = [
  {
    path: pathPrefix + '/',
    exact: true,
    name: "主页",
    icon: "fas fa-home",
    component: Home
  },
  {
    path: pathPrefix + '/create-server',
    exact: true,
    name: "创建服务器",
    icon: "fas fa-plus-square",
    component: CreateServer,
    requiredPermission: 'panelAdmin'
  },
  {
    path: pathPrefix + '/item-ids',
    exact: true,
    name: "物品ID",
    icon: "fas fa-list-ol",
    component: ItemIDs
  }
];

const serverRoutes = [
  {
    path: pathPrefix + '/:serverID',
    exact: true,
    name: "仪表板",
    icon: "fas fa-desktop",
    component: Dashboard
  },

  {
    path: pathPrefix + '/:serverID/server-management',
    exact: true,
    name: "服务器管理",
    icon: "fas fa-server",
    component: ServerManagement,
    requiresPermission: [
      'renameServer',
      'viewServerFiles',
      'editConfigFiles',
      'manageServerInstance',
      'clearPlayerLocations'
    ]
  },

  {
    path: pathPrefix + '/:serverID/stats',
    exact: true,
    name: "服务器统计",
    icon: "fas fa-chart-line",
    component: ServerStats,
    requiresPermission: [
      'viewServerStats'
    ]
  },

  {
    path: pathPrefix + '/:serverID/admins/:steamID',
    exact: true,
    name: "管理员",
    icon: "fas fa-user-shield",
    component: Admins,
    displayInSidebar: false
  },
  {
    path: pathPrefix + '/:serverID/admins',
    exact: false,
    name: "管理员",
    icon: "fas fa-user-shield",
    component: Admins
  },

  {
    path: pathPrefix + '/:serverID/admin-logs',
    exact: false,
    name: "管理员日志",
    icon: "fas fa-clipboard-list",
    component: AdminLogs,
    requiresPermission: [
      'viewAdminLogs'
    ]
  },

  {
    path: pathPrefix + '/:serverID/players/:guid',
    exact: true,
    name: "玩家",
    icon: "fas fa-users",
    component: Players,
    displayInSidebar: false
  },
  {
    path: pathPrefix + '/:serverID/players',
    exact: false,
    name: "玩家",
    icon: "fas fa-users",
    component: Players,
    requiresPermission: [
      'viewPlayerInfo',
      'adjustGold',
      'stripPlayer',
      'wipePlayerNames',
      'viewBans',
      'manageBans',
      'deleteBans',
      'viewWarnings',
      'createWarnings',
      'deleteWarnings',
      'viewNotes',
      'createNotes',
      'deleteNotes',
      'viewIPRecords',
      'viewIPs'
    ]
  },

  {
    path: pathPrefix + '/:serverID/playersbyip/:ipMask',
    exact: true,
    name: "玩家IP",
    icon: "fas fa-users",
    component: PlayersByIP,
    displayInSidebar: false
  },
  {
    path: pathPrefix + '/:serverID/playersbyip',
    exact: false,
    name: "玩家IP",
    icon: "fas fa-users",
    component: PlayersByIP,
    requiresPermission: [
      'viewIPRecords',
      'viewIPs'
    ]
  },
  {
    path: pathPrefix + '/:serverID/logs/:searchString',
    exact: false,
    name: "日志",
    icon: "fas fa-clipboard-list",
    component: LogSearch,
    displayInSidebar: false
  },
  {
    path: pathPrefix + '/:serverID/logs',
    exact: false,
    name: "日志",
    icon: "fas fa-clipboard-list",
    component: LogSearch,
    requiresPermission: [
      'viewServerLogs'
    ]
  },
  {
    path: pathPrefix + '/:serverID/ban-list',
    exact: false,
    name: "封禁列表",
    icon: "fas fa-clipboard-list",
    component: BanList,
    requiresPermission: [
      'viewBans'
    ]
  },
  {
    path: pathPrefix + '/:serverID/richest-players',
    exact: false,
    name: "财富排行榜",
    icon: "fas fa-university",
    component: RichestPlayers
  }
];

export {
  generalRoutes,
  serverRoutes
};
export default [
  {
    type: 'start_server',
    name: '开启服务器',
    toString: () => `开启了服务器.`
  },
  {
    type: 'stop_server',
    name: '停止服务器',
    toString: () => `停止了服务器.`
  },
  {
    type: 'restart_server',
    name: '重启服务器',
    toString: () => `重启了服务器.`
  },
  {
    type: 'add_admin_permission',
    name: '添加管理员',
    toString: adminLog => `添加了 ${adminLog.targetAdmin.displayName} 作为管理员.`
  },
  {
    type: 'update_admin_permission',
    name: '编辑管理员权限',
    toString: adminLog => `编辑了 ${adminLog.targetAdmin.displayName} 的管理员权限.`
  },
  {
    type: 'remove_admin_permission',
    name: '移除管理员',
    toString: adminLog => `移除了 ${adminLog.targetAdmin.displayName} 的管理员身份.`
  },
  {
    type: 'add_ban',
    name: '封禁',
    toString: adminLog => `${adminLog.ipBanned ? 'IP' : ''} 封禁了 ${adminLog.targetPlayer.guid} ${adminLog.length === -1 ? '永久' : `for ${adminLog.length} ${adminLog.length > 1 ? '天' : '天'}`} 原因是: ${adminLog.reason}`
  },
  {
    type: 'un_ban',
    name: '解封',
    toString: adminLog => `解封了 ${adminLog.targetPlayer.guid} 原因是: ${adminLog.reason}`
  },
  {
    type: 'delete_ban',
    name: '删除封禁记录',
    toString: adminLog => `删除了 ${adminLog.targetPlayer.guid} 的封禁记录 原因是: ${adminLog.reason}`
  },
  {
    type: 'add_warning',
    name: '警告',
    toString: adminLog => `警告了 ${adminLog.targetPlayer.guid} 原因是: ${adminLog.reason}`
  },
  {
    type: 'delete_warning',
    name: '删除警告',
    toString: adminLog => `删除了 ${adminLog.targetPlayer.guid} 的警告记录 原因是: ${adminLog.reason}`
  },
  {
    type: 'add_note',
    name: '添加备注',
    toString: adminLog => `向 ${adminLog.targetPlayer.guid} 添加了一条备注 内容是: ${adminLog.reason}`
  },
  {
    type: 'delete_note',
    name: '删除备注',
    toString: adminLog => `删除了 ${adminLog.targetPlayer.guid} 的备注 原因是: ${adminLog.reason}`
  },
  {
    type: 'adjust_gold',
    name: '调整第纳尔',
    toString: adminLog => {
      switch (adminLog.adjustmentType) {
        case 'add':
          return `添加 ${adminLog.amount} 第纳尔 ${adminLog.remove ? '从' : '到'} ${adminLog.targetPlayer.guid} 的 ${adminLog.from === 'bankGold' ? '银行存款' : '携带现金'} 原因是: ${adminLog.reason}`;
        case 'remove':
          return `扣除 ${adminLog.amount} 第纳尔 ${adminLog.remove ? '从' : '到'} ${adminLog.targetPlayer.guid} 的 ${adminLog.from === 'bankGold' ? '银行存款' : '携带现金'} 原因是: ${adminLog.reason}`;
        case 'transfer':
          return `将 ${adminLog.amount} 第纳尔 从 ${adminLog.targetPlayer.guid} 转给 ${adminLog.recipientPlayer.guid} 原因是: ${adminLog.reason}`;
        default:
          return '出了些问题';
      }
    }
  },
  {
    type: 'strip_player',
    name: '扒光玩家',
    toString: adminLog => `扒光了 ${adminLog.targetPlayer.guid} 原因是: ${adminLog.reason}`
  },
  {
    type: 'wipe_player_name',
    name: '清除角色名',
    toString: adminLog => `清除角色名: ${adminLog.name}`
  }
];
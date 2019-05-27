import { AdminPermission } from '../../../../models'

import { gamePermissions, panelPermissions } from 'shared';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const currentAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user
  });
  if (currentAdmin === null)
    throw new Error('You do not have permission to do that.');

  const selectedAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: args.steamID
  });
  if (selectedAdmin === null) throw new Error('Admin not found.');

  if (args.guid !== undefined && args.guid !== '') {
    const player = await Player.findOne({
      server: args.serverID,
      guid: args.guid
    });

    if (player === null) throw new Error('Player GUID not found.');

    selectedAdmin.player = player.guid;
  }

  for (let permission of panelPermissions.concat(gamePermissions)) {
    // don't allow admin to change own perms, but guid is fine
    if (context.user === args.steamID) break;

    if (args[permission.permission] === undefined) continue;

    if (
      (permission === 'manageAssignPermissions' &&
        currentAdmin.manageAssignPermissions < 2) ||
      (permission !== 'manageAssignPermissions' &&
        ((selectedAdmin[permission] < 2 &&
          currentAdmin[permission] < 2 &&
          currentAdmin.manageAssignPermissions < 1) ||
          (selectedAdmin[permission] > 1 &&
            (selectedAdmin.manageAssignPermissions > 0 ||
              currentAdmin.manageAssignPermissions < 1))))
    )
      continue;

    selectedAdmin[permission.permission] = args[permission.permission];
  }

  if (selectedAdmin.manageAssignPermissions > 0) {
    for (let permission of panelPermissions.concat(gamePermissions)) {
      if (permission.permission === 'manageAssignPermissions') continue;
      selectedAdmin[permission] = 2;
    }
  }

  await selectedAdmin.save();
  return selectedAdmin;
};
import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Button,
  Card,
  CardHeader,
  Table
} from 'reactstrap';

class Component extends React.Component {
  constructor(){
    super();
    this.goToServer = this.goToServer.bind(this);
  }

  goToServer(serverID){
    this.props.history.push(
      this.props.match.path
        .replace(':serverID', '')
      + serverID
    );
  }

  render(){
    return (
      <Card>
        <CardHeader className="border-0">
          <h3 className="mb-0">Servers</h3>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th>Server Name</th>
            <th>Map</th>
            <th>Player Count</th>
            <th>Go to Server</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.adminPermissions.map((adminPermission, key) => (
              <tr key={key}>
                <td>
                  {adminPermission.server.name}
                </td>
                <td>
                  {adminPermission.server.serverStatus ? adminPermission.server.serverStatus.MapName : 'Server Offline'}
                </td>
                <td>
                  {
                    adminPermission.server.serverStatus &&
                    (
                      <>{adminPermission.server.serverStatus.NumberOfActivePlayers} / {adminPermission.server.serverStatus.MaxNumberOfPlayers}</>
                    )
                  }
                  {
                    !adminPermission.server.serverStatus &&
                    (
                      <>Server Offline</>
                    )
                  }
                </td>
                <td>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => { this.goToServer(adminPermission.server.id) }}
                  >
                    Go to Server...
                  </Button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </Card>
    );
  }
}

export default withRouter(Component);
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardHeader,
  Table
} from "reactstrap";

class Component extends React.Component {
  render(){
    return (
      <Card>
        <CardHeader className="border-0">
          <h3 className="mb-0">服务器</h3>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th>服务器名</th>
            <th>地图</th>
            <th>玩家人数</th>
            <th>转到服务器</th>
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
                      <>服务器离线</>
                    )
                  }
                </td>
                <td>
                  <Button
                    color="primary"
                    size="sm"
                    tag={Link}
                    to={`/admin/${adminPermission.server.id}/`}
                  >
                    转到服务器...
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

export default Component;
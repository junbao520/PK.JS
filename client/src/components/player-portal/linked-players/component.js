import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";

import LinkSteamUser from '../link-steam-user';

class Component extends React.Component{
  render(){
    return (
      <Card>
        <CardHeader className="border-0">
          <h3 className="mb-0">绑定的角色</h3>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th>GUID</th>
            <th>服务器名</th>
            <th>玩家人数</th>
            <th>转到服务器</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.linkedPlayers.map((player, key) => (
              <tr key={key}>
                <td>
                  {player.guid}
                </td>
                <td>
                  {player.server.name}
                </td>
                <td>
                  {
                    player.server.serverStatus &&
                    (
                      <>{player.server.serverStatus.NumberOfActivePlayers} / {player.server.serverStatus.MaxNumberOfPlayers}</>
                    )
                  }
                  {
                    !player.server.serverStatus &&
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
                    to={`/player/${player.server.id}/${player.guid}/`}
                  >
                    转到服务器...
                  </Button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </Table>
        <CardBody className="text-center">
          <Row className="justify-content-center">
            <Col sm="6" md="4">
              <LinkSteamUser />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default Component;
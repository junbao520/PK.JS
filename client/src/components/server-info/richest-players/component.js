import React from 'react';

import {
  Card,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

class Component extends React.Component {
  render() {
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">财富排行榜</h3>
            </Col>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th scope="col">名次</th>
            <th scope="col">角色名</th>
            <th scope="col">银行存款</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.richestPlayers.map((player, key) => (
              <tr key={key}>
                <th>{key+1}</th>
                <td>{player.lastPlayerName}</td>
                <td>{player.bankGold}</td>
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
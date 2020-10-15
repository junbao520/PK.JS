import React from 'react';
import moment from 'moment';

import {
  Card,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import SteamUser from '../../misc/steam-user';

class Component extends React.Component {
  render() {
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <Col className="col">
              <h3 className="mb-0">封禁列表 ({this.props.active ? '正在封禁' : '所有封禁记录'} Bans)</h3>
            </Col>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th scope="col">GUID</th>
            <th scope="col">原因</th>
            <th scope="col">公开原因</th>
            <th scope="col">开始日期</th>
            <th scope="col">结束日期</th>
            <th scope="col">IP封禁?</th>
            <th scope="col">管理员</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.bans.map((ban, key) => (
              <tr key={key}>
                <th scope="row">{ban.player.guid}</th>
                <td>{ban.privateReason}</td>
                <td>{ban.publicReason}</td>
                <td>{moment.utc(ban.startDate).format('YYYY/MM/DD HH:mm')}</td>
                <td>
                  {(ban.endDate ===  null) ? '永久封禁' : moment.utc(ban.endDate).format('YYYY/MM/DD HH:mm')}
                  <br />
                  {(ban.unbannedDate !==  null) ? `(已解封于: ${moment.utc(ban.unbannedDate).format('YYYY/MM/DD HH:mm')})` : ''}
                </td>
                <td>
                  {(ban.ipBan) ? '是' : '否'}
                </td>
                <td>
                  <SteamUser steamUser={ban.admin} />
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
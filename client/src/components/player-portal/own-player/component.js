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
    const { player } = this.props;
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <Col className="col">
              <h3 className="mb-0">角色信息</h3>
            </Col>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th>GUID</th>
            <th>在线状态</th>
            <th>上次使用的角色名</th>
            <th>绑定的Steam账户</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>{player.guid}</th>
            <td>{moment.utc(player.lastSeen).format('YYYY/MM/DD HH:mm')} ({(player.online > 0) ? '在线' : '离线'})</td>
            <td>{player.lastPlayerName}</td>
            <td>{(player.linkedSteamUser) ? <SteamUser steamUser={player.linkedSteamUser} /> : '没有绑定Steam账户'}</td>
          </tr>
          </tbody>
          <thead className="thead-light">
          <tr>
            <th>携带现金</th>
            <th>银行存款</th>
            <th>银行上限</th>
            <th>马匹</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{player.pouchGold}</td>
            <td>{player.bankGold}</td>
            <td>{player.bankLimit}</td>
            <td>{(player.horse === null) ? '空' : player.horse.name}</td>
          </tr>
          </tbody>
          <thead className="thead-light">
          <tr>
            <th>头部装备</th>
            <th>身体装备</th>
            <th>腿部装备</th>
            <th>手部装备</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{(player.headArmour === null) ? '空' : player.headArmour.name}</td>
            <td>{(player.bodyArmour === null) ? '空' : player.bodyArmour.name}</td>
            <td>{(player.footArmour === null) ? '空' : player.footArmour.name}</td>
            <td>{(player.handArmour === null) ? '空' : player.handArmour.name}</td>
          </tr>
          </tbody>
          <thead className="thead-light">
          <tr>
            <th>武器/物品</th>
            <th>武器/物品</th>
            <th>武器/物品</th>
            <th>武器/物品</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{(player.firstItem === null) ? '空' : player.firstItem.name}</td>
            <td>{(player.secondItem === null) ? '空' : player.secondItem.name}</td>
            <td>{(player.thirdItem === null) ? '空' : player.thirdItem.name}</td>
            <td>{(player.forthItem === null) ? '空' : player.forthItem.name}</td>
          </tr>
          </tbody>
          <thead className="thead-light">
          <tr>
            <th>血量</th>
            <th>饱食度</th>
            <th>中毒量</th>
            <th>马匹血量</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{player.health}</td>
            <td>{player.food}</td>
            <td>{player.poison}</td>
            <td>{player.horseHealth}</td>
          </tr>
          </tbody>
        </Table>
      </Card>
    );
  }
}

export default Component;
import React from 'react';
import moment from 'moment';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import SteamUser from '../../misc/steam-user';

class Component extends React.Component {
  state = {
    tab: 'Bans'
  };

  constructor(){
    super();
    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(tab){
    this.setState({ tab });
  }

  render() {
    const { player } = this.props;
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <Col className="col">
              <h3 className="mb-0">违规行为</h3>
            </Col>
            <Col className="col text-right">
              <Button
                color="primary"
                className={(this.state.tab === 'Bans') ? 'disabled' : null}
                onClick={() => this.onTabChange('Bans')}
                size="sm"
              >
                封禁记录
              </Button>
              <Button
                color="primary"
                className={(this.state.tab === 'Warnings') ? 'disabled' : null}
                onClick={() => this.onTabChange('Warnings')}
                size="sm"
              >
                警告记录
              </Button>
            </Col>
          </Row>
        </CardHeader>
        {(this.state.tab === 'Bans' && player.bans !== null) ? (
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
            <tr>
              <th scope="col">原因</th>
              <th scope="col">开始日期</th>
              <th scope="col">结束日期</th>
              <th scope="col">管理员</th>
            </tr>
            </thead>
            <tbody>
            {
              player.bans.map((ban, key) => (
                <tr key={key}>
                  <td>{ban.publicReason}</td>
                  <td>{moment.utc(ban.startDate).format('YYYY/MM/DD HH:mm')}</td>
                  <td>
                    {(ban.endDate ===  null) ? '永久封禁' : moment.utc(ban.endDate).format('YYYY/MM/DD HH:mm')}
                    <br />
                    {(ban.unbannedDate !==  null) ? `(已解封于: ${moment.utc(ban.unbannedDate).format('YYYY/MM/DD HH:mm')})` : ''}
                  </td>
                  <td>
                    <SteamUser steamUser={ban.admin} />
                  </td>
                </tr>
              ))
            }
            </tbody>
          </Table>
        ) : null}
        {(this.state.tab === 'Bans' && player.bans === null) ? (
          <CardBody>
            <div className="text-center mt-2 mb-2">
              没有权限!
            </div>
            <div className="btn-wrapper text-center">
              <i className="fas fa-lock fa-4x"/>
            </div>
            <div className="text-center mt-2 mb-2">
              您无权查看此封禁记录.
            </div>
          </CardBody>
        ) : null}
        {(this.state.tab === 'Warnings' && player.warnings !== null) ? (
          <>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
              <tr>
                <th scope="col">原因</th>
                <th scope="col">日期</th>
                <th scope="col">管理员</th>
              </tr>
              </thead>
              <tbody>
              {
                player.warnings.map((warning, key) => (
                  <tr key={key}>
                    <td>{warning.publicReason}</td>
                    <td>{moment.utc(warning.date).format('YYYY/MM/DD HH:mm')}</td>
                    <td>
                      <SteamUser steamUser={warning.admin} />
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
          </>
        ) : null}
        {(this.state.tab === 'Warnings' && player.warnings === null) ? (
          <CardBody>
            <div className="text-center mt-2 mb-2">
              没有权限!
            </div>
            <div className="btn-wrapper text-center">
              <i className="fas fa-lock fa-4x"/>
            </div>
            <div className="text-center mt-2 mb-2">
              您无权查看此警告记录.
            </div>
          </CardBody>
        ) : null}
      </Card>
    );
  }
}

export default Component;
import React from 'react';
import moment from 'moment';

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import SteamUser from '../../misc/steam-user';

import AddBan from './add-ban';
import AddWarning from './add-warning';
import AddNote from './add-note';

import UnBan from './un-ban';
import DeleteBan from './delete-ban';
import DeleteWarning from './delete-warning';
import DeleteNote from './delete-note';

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
              <Button
                color="primary"
                className={(this.state.tab === 'Notes') ? 'disabled' : null}
                onClick={() => this.onTabChange('Notes')}
                size="sm"
              >
                备注记录
              </Button>
            </Col>
          </Row>
        </CardHeader>
        {(this.state.tab === 'Bans' && player.bans !== null) ? (
          <>
            {
              player.ipBanned.length > 0 &&
              (
                <CardBody className="text-center">
                  <Alert color="danger">
                    <strong>这名玩家因以下GUID被IP封禁:</strong> { player.ipBanned.map(player => player.guid).join(',')}
                  </Alert>
                </CardBody>
              )
            }
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
              <tr>
                <th scope="col">原因</th>
                <th scope="col">公开原因</th>
                <th scope="col">开始日期</th>
                <th scope="col">结束日期</th>
                <th scope="col">IP封禁?</th>
                <th scope="col">管理员</th>
                <th scope="col">操作</th>
              </tr>
              </thead>
              <tbody>
              {
                player.bans.map((ban, key) => (
                  <tr key={key}>
                    <th scope="row">{ban.privateReason}</th>
                    <td>{ban.publicReason}</td>
                    <td>{moment.utc(ban.startDate).format('YYYY/MM/DD HH:mm')}</td>
                    <td>
                      {(ban.endDate ===  null) ? '永久封禁' : moment.utc(ban.endDate).format('YYYY/MM/DD HH:mm')}
                      <br />
                      {(ban.unbannedDate !==  null) ? `(解禁于: ${moment.utc(ban.unbannedDate).format('YYYY/MM/DD HH:mm')})` : ''}
                    </td>
                    <td>
                      {(ban.ipBan) ? '是' : '否'}
                    </td>
                    <td>
                      <SteamUser steamUser={ban.admin} />
                    </td>
                    <td>
                      {
                        (ban.endDate === null || ban.endDate > Date.now()) &&
                        ban.unbannedDate === null &&
                        (
                          <UnBan
                            banID={ban._id}
                          />
                        )
                      }
                      <DeleteBan
                        serverID={this.props.serverID}
                        guid={player.guid}
                        banID={ban._id}
                      />
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
            <CardBody className="text-center">
              <AddBan
                serverID={this.props.serverID}
                guid={player.guid}
              />
            </CardBody>
          </>
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
              您无权查看封禁记录.
            </div>
          </CardBody>
        ) : null}
        {(this.state.tab === 'Warnings' && player.warnings !== null) ? (
          <>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
              <tr>
                <th scope="col">原因</th>
                <th scope="col">公开原因</th>
                <th scope="col">日期</th>
                <th scope="col">管理员</th>
                <th scope="col">操作</th>
              </tr>
              </thead>
              <tbody>
              {
                player.warnings.map((warning, key) => (
                  <tr key={key}>
                    <th scope="row">{warning.privateReason}</th>
                    <td>{warning.publicReason}</td>
                    <td>{moment.utc(warning.date).format('YYYY/MM/DD HH:mm')}</td>
                    <td>
                      <SteamUser steamUser={warning.admin} />
                    </td>
                    <td>
                      <DeleteWarning
                        serverID={this.props.serverID}
                        guid={player.guid}
                        warningID={warning._id}
                      />
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
            <CardBody className="text-center">
              <AddWarning
                serverID={this.props.serverID}
                guid={player.guid}
              />
            </CardBody>
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
              您无权查看警告记录.
            </div>
          </CardBody>
        ) : null}
        {(this.state.tab === 'Notes' && player.notes !== null) ? (
          <>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
              <tr>
                <th scope="col">备注</th>
                <th scope="col">日期</th>
                <th scope="col">管理员</th>
                <th scope="col">操作</th>
              </tr>
              </thead>
              <tbody>
              {
                player.notes.map((note, key) => (
                  <tr key={key}>
                    <th scope="row">{note.note}</th>
                    <td>{moment.utc(note.date).format('DD/MM/YYYY HH:mm')}</td>
                    <td>
                      <SteamUser steamUser={note.admin} />
                    </td>
                    <td>
                      <DeleteNote
                        serverID={this.props.serverID}
                        guid={player.guid}
                        noteID={note._id}
                      />
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
            <CardBody className="text-center">
              <AddNote
                serverID={this.props.serverID}
                guid={player.guid}
              />
            </CardBody>
          </>
        ) : null}
        {(this.state.tab === 'Notes' && player.notes === null) ? (
          <CardBody>
            <div className="text-center mt-2 mb-2">
              没有权限!
            </div>
            <div className="btn-wrapper text-center">
              <i className="fas fa-lock fa-4x"/>
            </div>
            <div className="text-center mt-2 mb-2">
              您无权查看备注记录.
            </div>
          </CardBody>
        ) : null}
      </Card>
    );
  }
}

export default Component;
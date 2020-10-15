import React from 'react';
import { Link } from 'react-router-dom';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";

import AdvancedModal from '../../misc/modals/advanced-modal';

class Component extends React.Component {
  render() {
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">在线玩家</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {
            this.props.onlinePlayers.length === 0 && (
              <>
                <div className="text-center mt-2 mb-2">
                  没有玩家在线，真操蛋!
                </div>
                <div className="btn-wrapper text-center">
                  <i className="far fa-frown-open fa-4x"/>
                </div>
              </>
            )
          }
          {
            this.props.onlinePlayers.map((player, key) => {
              // hide popup in player portal
              if(this.props.playerPortal) return (
                <Badge
                  color="primary"
                  className="mr-2"
                >
                  {player.lastPlayerName}
                </Badge>
              );

              return (
                <AdvancedModal
                  isOpen={false}
                  key={key}
                >
                  {(modal) =>  (
                    <>
                      <Badge
                        color="primary"
                        className="mr-2"
                        onClick={modal.open}
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        {player.lastPlayerName}
                      </Badge>

                      <Modal
                        className="modal-dialog-centered modal-primary"
                        contentClassName="bg-gradient-primary"
                        isOpen={modal.isOpen}
                        toggle={modal.close}
                      >
                        <div className="modal-header">
                          <h6 className="modal-title">
                            角色信息
                          </h6>
                          <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={modal.close}
                          >
                            <span aria-hidden={true}>×</span>
                          </button>
                        </div>
                        <ModalBody>
                          <div className="py-3 text-center">
                            <i className="fas fa-info-circle fa-4x" />
                            <h4 className="heading mt-4">
                              {player.guid}
                            </h4>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="default"
                            className="btn-white"
                            tag={Link}
                            to={`/admin/${this.props.serverID}/players/${player.guid}/`}
                          >
                            查看角色信息
                          </Button>
                          <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            onClick={modal.close}
                          >
                            关闭
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </>
                  )}
                </AdvancedModal>
              );
            })
          }
        </CardBody>
      </Card>
    );
  }
}

export default Component;
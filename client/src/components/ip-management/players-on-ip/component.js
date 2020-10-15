import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
              <h3 className="mb-0">玩家IP</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {
            this.props.ipRecords.map((record, key) => (
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
                      {record.player.guid}
                    </Badge>

                    <Modal
                      className="modal-dialog-centered modal-primary"
                      contentClassName="bg-gradient-primary"
                      isOpen={modal.isOpen}
                      toggle={modal.close}
                    >
                      <div className="modal-header">
                        <h6 className="modal-title">
                          玩家IP信息
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
                            {record.player.guid}
                          </h4>
                          <p><strong>IP上次出现:</strong> {moment.utc(record.lastSeen).format('YYYY/MM/DD HH:mm')}</p>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="default"
                          className="btn-white"
                          tag={Link}
                          to={`/admin/${this.props.serverID}/players/${record.player.guid}/`}
                        >
                          查看玩家页面
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
            ))
          }
        </CardBody>
      </Card>
    );
  }
}

export default Component;
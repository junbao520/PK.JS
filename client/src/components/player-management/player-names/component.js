import React from 'react';
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
import WipeName from './wipe-name';

class Component extends React.Component {
  render() {
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">角色名</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {
            this.props.names.map((name, key) => (
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
                      {name.name}
                    </Badge>

                    <Modal
                      className="modal-dialog-centered modal-primary"
                      contentClassName="bg-gradient-primary"
                      isOpen={modal.isOpen}
                      toggle={modal.close}
                    >
                      <div className="modal-header">
                        <h6 className="modal-title">
                          角色名信息
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
                          <h4 className="heading mt-4">{name.name}</h4>
                          <p><strong>上次在线:</strong> {moment.utc(name.lastSeen).format('YYYY/MM/DD HH:mm')}</p>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <WipeName
                          serverID={this.props.serverID}
                          guid={this.props.guid}
                          name={name.name}
                          onClick={modal.close}
                        />
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
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";

import AdvancedModal from '../../misc/modals/advanced-modal';

class Component extends React.Component {
  render() {
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <h3 className="mb-0">玩家IP</h3>
        </CardHeader>
        <CardBody>
          <h6 className="heading-small text-muted mb-4">IP掩码</h6>
          <div className="pl-lg-4">
            {
              this.props.ipRecords.map((record, key) => {
                if(record.player === null){
                  console.log(`Error with IPRecord: ${JSON.stringify(record)}`);
                  return null;
                }

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
                          #{record.ipMask.toString().padStart(6, '0')}
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
                                #{record.ipMask.toString().padStart(6, '0')}
                              </h4>
                              <p><strong>IP地址:</strong> {(record.ip) ? record.ip : '***.***.***.***'}</p>
                              <p><strong>上次出现:</strong> {moment.utc(record.lastSeen).format('YYYY/MM/DD HH:mm')}</p>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="default"
                              className="btn-white"
                              tag={Link}
                              to={`/admin/${this.props.serverID}/playersbyip/${record.ipMask}/`}
                            >
                              查看IP页面
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
                )
              })
            }
          </div>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">通过IP绑定的GUID</h6>
          <div className="pl-lg-4">
            {
              this.props.ipLinkedRecords.map((record, key) => {
                if(record.player === null){
                  console.log(`Error with IPRecord: ${JSON.stringify(record)}`);
                  return null;
                }

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
                          {record.player.guid} (#{record.ipMask})
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
                                {record.player.guid} (#{record.ipMask})
                              </h4>
                              <p><strong>IP上次出现:</strong> {moment.utc(record.lastSeen).format('YYYY/MM/DD HH:mm')}</p>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="default"
                              className="btn-white"
                              onClick={() => modal.close()}
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
                );
              })
            }
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Component;
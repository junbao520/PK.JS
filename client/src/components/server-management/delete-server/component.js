import React from 'react';
import { Button } from 'reactstrap';

import DangerModal from '../../misc/modals/danger-modal';

class DeleteServer extends React.Component{
  state = {
    confirmation: false
  };

  render(){
    return (
      <>
        {
          this.state.confirmation &&
          (
            <DangerModal
              subText="删除服务器将删除所有玩家信息和服务器文件，不可撤销！"
              action={this.props.action}
              onClose={() => {this.setState({ confirmation: false})}}
            />
          )
        }

        <Button
          color="danger"
          onClick={() => {this.setState({ confirmation: true })}}
        >
          删除服务器
        </Button>
      </>
    );
  }
}

export default DeleteServer;
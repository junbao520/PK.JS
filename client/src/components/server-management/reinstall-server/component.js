import React from 'react';
import { Button } from 'reactstrap';

import DangerModal from '../../misc/modals/danger-modal';

class Component extends React.Component{
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
              subText="重新安装服务器将删除服务器文件，并将文件从默认服务器目录复制回去，不可撤销！"
              action={this.props.action}
              onClose={() => {this.setState({ confirmation: false})}}
            />
          )
        }

        <Button
          color="danger"
          onClick={() => {this.setState({ confirmation: true })}}
        >
          重新安装服务器
        </Button>
      </>
    );
  }
}

export default Component;
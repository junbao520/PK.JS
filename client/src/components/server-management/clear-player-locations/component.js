import React from 'react';
import { Button } from 'reactstrap';

import WarningModal from '../../misc/modals/warning-modal';

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
            <WarningModal
              subText="这将清除所有玩家的位置，以便他们在自己派系的出生点出生."
              action={this.props.action}
              onClose={() => {this.setState({ confirmation: false})}}
            />
          )
        }

        <Button
          color="warning"
          onClick={() => {this.setState({ confirmation: true })}}
        >
          清除玩家位置
        </Button>
      </>
    );
  }
}

export default DeleteServer;
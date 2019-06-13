import React from 'react';

// import {realMessage, getMessage} from '../screens/Chat';


class Messages extends React.Component {
    constructor(props) {
      super(props);
      this.counter = 0;
    }
    
    render() {
      let messageDom = this.props.data.map((message, index) => {
        return (
          <span key={this.counter++} className={(this.props.isId) ? 'messageRight' : 'messageLeft'}>{message}</span>
        )
      });
      
  
      return (
        <div className='messageBox'>
          {messageDom}
        </div>
      )
    }
}

// function messageTest() {
//     if (realMessage === getMessage) {
//         realMessage = '';
//         getMessage = '';
//         return true;
//     } else {
//         realMessage = '';
//         getMessage = '';
//         return false;
//     }
// }

export default Messages;
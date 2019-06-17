import React from 'react';
import io from 'socket.io-client';
import Messages from '../components/Messages';
import {connect} from 'react-redux';

import {addMessage} from '../Redux/actions';

let socket;
let name;
// let person;


class Chat extends React.Component {
    constructor() {
        super();

        this.sendMessage = this.sendMessage.bind(this);
        this.myRef = React.createRef();
    }
    
    sendMessage(e) {
      e.preventDefault();
      socket.send({
        message: this.myRef.current.value,
        name: name
      });
      this.myRef.current.value = '';
    }

    componentDidMount() {
        socket = io.connect('http://localhost:4000');
        socket.on('message', (data) => {
            console.log(data);
            // console.log(data.person);
            this.props.addMessage(data);
            console.log(name);
        });
    }
  
    render() {
      name = this.props.user.name;
      console.log(this.props);
      return (
        <div className='box'>
          <span className='name'>Common Chat</span>
          <div className='chat'>
            <Messages data={this.props.messages}/>
          </div>
          <form className='form' onSubmit={this.sendMessage}>
            <input placeholder='Write the message' className='input' ref={this.myRef}/>
            <button type='submit' className='button'>Send</button>
          </form>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {user: state.user, messages: state.messages};
  }
  export default connect(mapStateToProps, {addMessage})(Chat);

  
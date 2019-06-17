import React from 'react';
import io from 'socket.io-client';
import Messages from '../components/Messages';
import {connect} from 'react-redux';

import {addMessage} from '../Redux/actions';

let socket;
// let messages = [];
// let trueId;


class Chat extends React.Component {
    constructor() {
        super();

        this.sendMessage = this.sendMessage.bind(this);
        this.myRef = React.createRef();
    }
    
    sendMessage(e) {
      e.preventDefault();
      socket.send(this.myRef.current.value);
      this.myRef.current.value = '';
    }

    componentDidMount() {
        socket = io.connect('http://localhost:4000');
        socket.on('message', (data) => {
            console.log(data.text);
            // trueId = (socket.id === data.id ? true : false);
            // messages.push(data.text);
            // this.setState({message: data.text});
            this.props.addMessage(data.text);
            console.log(this.props);
        });
    }
  
    render() {
      return (
        <div className='box'>
          <span className='name'>Common Chat</span>
          <div className='chat'>
            <Messages data={this.props.messages} user={this.props.user}/>
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

  
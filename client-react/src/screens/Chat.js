import React from 'react';
import io from 'socket.io-client';
import Messages from '../components/Messages'

let socket;
let messages = [];
let trueId;


class Chat extends React.Component {
    constructor() {
        super();

        this.state = {
            message: ''
        }

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
            trueId = (socket.id === data.id ? true : false);
            messages.push(data.text);
            this.setState({message: data.text});
        });
    }
  
    render() {
      return (
        <div className='box'>
          <span className='name'>Common Chat</span>
          <div className='chat'>
            <Messages data={messages} isId={trueId}/>
          </div>
          <form className='form' onSubmit={this.sendMessage}>
            <input placeholder='Write the message' className='input' ref={this.myRef}/>
            <button type='submit' className='button'>Send</button>
          </form>
        </div>
      )
    }
  }


  export default Chat;

  
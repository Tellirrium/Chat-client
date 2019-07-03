import React from 'react';
import Messages from '../components/Messages';
import Users from '../components/Users'
import {connect} from 'react-redux';

import {addMessage, showUsersFromBd, sendMessage, closeSocket} from '../Redux/actions';

let name;


class Chat extends React.Component {
    constructor() {
        super();

        this.sendMessage = this.sendMessage.bind(this);
        this.changeHistory = this.changeHistory.bind(this);
        this.myRef = React.createRef();
        this.myRefScroll = React.createRef();
    }

    componentDidUpdate() {
      this.myRefScroll.current.scrollTop = this.myRefScroll.current.scrollHeight - this.myRefScroll.current.clientHeight;
    }

    componentWillUnmount() {
      closeSocket();
    }
    
    sendMessage(e) {
      e.preventDefault();
      sendMessage(this.myRef.current.value, name);
      this.myRef.current.value = '';
    }

    changeHistory() {
      this.props.history.push('/');
      window.location.reload();
    }

    showUsers = () => {
      this.props.showUsersFromBd();
    }
  
    render() {
      name = this.props.user.name;
      console.log(this.props);
      return (
        <div className='app'>
        <div className='infoBar'>
          <div className='personalInfo'>
            <img src={this.props.src} alt='userphoto' className={this.props.src ? '' : 'none'}></img>
            <p>{this.props.user.name ? this.props.user.name : 'Аноним, авторизуйся'}</p>
            <button className={this.props.user.name ? 'none' : ''} onClick={this.changeHistory}>Авторизация</button>
          </div>
          <button className='usersButton' onClick={this.showUsers}>Show users</button>
          <Users data={this.props.users}/>
        </div>
        <div className='box'>
          <span className='name'>Common Chat</span>
          <div className='chat' ref={this.myRefScroll}>
            <Messages data={this.props.messages}/>
          </div>
          <form className='form' onSubmit={this.sendMessage}>
            <input placeholder='Write the message' className='input' ref={this.myRef}/>
            <button type='submit' className='button'>Send</button>
          </form>
        </div>
        </div>
      )
    }
  }


  const mapStateToProps = (state) => {
    return {user: state.user, messages: state.messages, src: state.user.src, users: state.users};
  };

  export default connect(mapStateToProps, {addMessage, showUsersFromBd})(Chat);

  
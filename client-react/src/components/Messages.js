import React from 'react';


class Messages extends React.Component {
    constructor(props) {
      super(props);
      this.counter = 0;
    }
    
    render() {
      let messageDom = this.props.data.map((message) => {
        return (
          <div className='messageBox' key={this.counter++}>
            <div className='userInfo'>
              <img src={message.person.src} alt='userPicture'></img>
              <span>{message.person.name}</span>
            </div>
            <span>{message.text}</span>
          </div>
        )
      });
      
  
      return (
        <div className='mainBox'>
          {messageDom} 
        </div>
      )
    }
}


export default Messages;
import React from 'react';


class Users extends React.Component {
    constructor(props) {
      super(props);
      this.counter = 0;
    }
    
    render() {
        let usersDom = this.props.data.map((user) => {
          return (
              <div className='userInfo2' key={this.counter++}>
                <img src={user.picture} alt='userPicture'></img>
                <span>{user.name}</span>
              </div>
          )
        });
        
        return (
          <div className='mainBox'>
            {usersDom}
          </div>
        )
      };
}


export default Users;
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import {connect} from 'react-redux';

import {addUser} from '../Redux/actions';



class Home extends React.Component {
    render() {
  
      const responseGoogle = (response) => {
        console.log(response.tokenId);
        sendToken(response.tokenId, this.props);
        // this.props.history.push('/chat');
        
      }
  
      return (
        <React.Fragment>
          <p className='headline'>Авторизация</p>
          <div className='autorize'>
            <GoogleLogin
              clientId="678754015352-jca0fg9glpn9vjgjs6v56kbm0v6hu0os.apps.googleusercontent.com"
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='google'>Google</button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </React.Fragment>
      )
    }
}

function sendToken(data, props) {
  const myInit = { method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({data})
                };

  console.log(props);

  fetch('http://localhost:4000/auth', myInit).then( res => res.json()).then(data => {
    const person = {
      name: data.name,
      src: data.picture
    };

    props.addUser(person);
    console.log(person);
  }).then(props.history.push('/chat'));
}

export default connect(null, {addUser}) (Home);
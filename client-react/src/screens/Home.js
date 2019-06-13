import React from 'react';
import { GoogleLogin } from 'react-google-login';


class Home extends React.Component {
    render() {
  
      const responseGoogle = (response) => {
        console.log(response.tokenId);
        sendToken(response.tokenId, this.props);
        // this.props.history.push('/chat');
      }
  
      return (
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
      )
    }
}

function sendToken(data, props) {
  const myInit = { method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({data})
                };

  fetch('http://localhost:4000/auth', myInit).then( res => res.json()).then(data => console.log(data)).then(props.history.push('/chat'));
}

export default Home;
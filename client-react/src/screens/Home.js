import React from 'react';
import { GoogleLogin } from 'react-google-login';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import {addUser, addStyleCross, addStyleCheck, checkValue, checkUser} from '../Redux/actions';


class Home extends React.Component {
    constructor() {
      super();
      this.passwordRef = React.createRef();
      this.emailRef = React.createRef();
    }

    linkToRegistration = () => {
      this.props.history.push('/registration');
    }

    checkEmail = (e) => {
      if (/^.+@.+\..+$/igm.test(e.target.value)) {
        this.props.addStyleCheck('checkCircle');
        this.props.addStyleCross('none');
      } else if (e.target.value === '')  {
        this.props.addStyleCross('none');
      } else {
        this.props.addStyleCross('cross');
        this.props.addStyleCheck('none');
      }
    }

    checkUserInbd = (e) => {
      e.preventDefault();
      if (this.passwordRef.current.value && this.props.styleIconsCheck === 'checkCircle') {
        // this.props.checkValue(false);

        const userInfo = {
          email: this.emailRef.current.value.trim(),
          password: this.passwordRef.current.value.trim()
        }

        this.props.checkUser(this, userInfo);
      } else {
        this.props.checkValue(true);
      }
    }

    render() {
  
      const responseGoogle = (response) => {
        console.log(response.tokenId);
        sendToken(response.profileObj, this.props);  
      }
  
      return (
        <React.Fragment>
          <p className='headline'>Авторизация</p>
          <div className='autorize'>
            <form className='login' onSubmit={this.checkUserInbd}>
              <div className='email'>
                <input placeholder='Login' type='text' onChange={this.checkEmail} ref={this.emailRef}/>
                <FontAwesomeIcon icon={faTimesCircle}  className={this.props.styleIconsCross}/>
                <FontAwesomeIcon icon={faCheckCircle} className={this.props.styleIconsCheck}/>
              </div>
              <input placeholder='Password' type='text' ref={this.passwordRef} />
              <p className={this.props.value ? 'error' : 'none2'}>Некорректные данные или Вы не зарегистрированы</p>
              <p className={this.props.password ? 'error' : 'none3'}>Неверный пароль</p>
              <button type='submit' className='loginButton' >Войти</button>
              <p onClick={this.linkToRegistration} className='registrWord'>Зарегистрироваться</p>
              <p>Или автроизируйтесь через:</p>
            </form>
            <GoogleLogin
              clientId="678754015352-jca0fg9glpn9vjgjs6v56kbm0v6hu0os.apps.googleusercontent.com"
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='google'>Google</button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              // onFailure={responseGoogle}
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

  console.log(data);

  fetch('http://localhost:4000/auth', myInit).then( res => res.json()).then(data => {
    const person = {
      name: data.name,
      src: data.src
    };
    console.log(person);
    props.addUser(person);
    localStorage.person = person.name;
    localStorage.picture = person.src;
  }).then(props.history.push('/chat'));
}


const mapStateToProps = (state) => {
  return {user: state.user, messages: state.messages, styleIconsCross: state.styleIconsCross, styleIconsCheck: state.styleIconsCheck, value: state.value, password: state.password};
};

export default connect(mapStateToProps, {addUser, addStyleCross, addStyleCheck, checkValue, checkUser}) (Home);
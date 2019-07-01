import React from 'react';
import {connect} from 'react-redux';
import {registrValue, registrUser} from '../Redux/actions';

class Registration extends React.Component {
    constructor() {
        super();
        this.passwordRef = React.createRef();
        this.emailRef = React.createRef();
        this.nameRef = React.createRef();
    }

    validationEmail = (e) => {
        if (/^.+@.+\..+$/igm.test(e.target.value)) {
            this.emailRef.current.id='inputGreen';
        } else if (e.target.value === '') {
            this.emailRef.current.id='inputDefault';
        } else {
            this.emailRef.current.id='inputRed';
        }
    }

    validationNameOrPassword = (e) => {
        if (/([A-Z]){2,}/ig.test(e.target.value)) {
            e.target.id='inputGreen';
        } else if (e.target.value === '') {
            e.target.id='inputDefault';
        } else {
            e.target.id='inputRed';
        }
    }

    registration = (e) => {
        e.preventDefault();
        if (this.emailRef.current.id === 'inputGreen' && this.passwordRef.current.id === 'inputGreen' && this.nameRef.current.id === 'inputGreen') {
            
            const user = {
                email: this.emailRef.current.value,
                name: this.nameRef.current.value,
                password: this.passwordRef.current.value
            }

            this.props.registrUser(this, user);

        } else {
            this.props.registrValue(true);
            console.log(this.props);
        }
    }

    render() {
        return (
            <form className='mainDivRegistr' onSubmit={this.registration} >
                <span>Registration</span>
                <input placeholder='Email adress' ref={this.emailRef} onChange={this.validationEmail} ></input>
                <input placeholder='Full name (only english)' ref={this.nameRef} onChange={this.validationNameOrPassword} ></input>
                <input placeholder='Create the password' ref={this.passwordRef} onChange={this.validationNameOrPassword} ></input>
                <button className='registrButton' type='submit'>Регистрация</button>
                <p className={this.props.registrationValue ? 'error' : 'none3'}>Некорректные данные или почта уже используется</p>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {registrationValue: state.registrationValue};
};

export default connect(mapStateToProps, {registrValue, registrUser}) (Registration);


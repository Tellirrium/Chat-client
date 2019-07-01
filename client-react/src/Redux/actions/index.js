export const addUser = (user) => ({type:'ADD_USER', payload: user});
export const addMessage = (message) => ({type:'ADD_MESSAGE', payload: message});
export const addStyleCross = (className) => ({type:'ADD_CLASSNAME_CROSS', payload: className});
export const addStyleCheck = (className) => ({type:'ADD_CLASSNAME_CHECK', payload: className});
export const checkValue = (boolean) => ({type:'ADD_BOOL', payload: boolean});
export const registrValue = (boolean) => ({type:'ADD_BOOL2', payload: boolean});
export const wrongPassword = (boolean) => ({type:'ADD_BOOL3', payload: boolean});

export const checkUser = (self, userInfo) => {
    return (dispatch) => {

        const myInit = { method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify({userInfo})
                       };
        
        fetch('http://localhost:4000/searchUser', myInit).then( res => res.json()).then(response => {
            console.log(response);
            if (response.message === 'Wrong password') {
                dispatch(wrongPassword(true));
                dispatch(checkValue(false));
            } else if (response.message === 'error') {
                dispatch(checkValue(true));
                dispatch(wrongPassword(false));
            } else {
                dispatch(addUser(response));
                self.props.history.push('/chat');
            }
        });
    };
};

export const registrUser = (self, user) => {
    return (dispatch) => {

        const myInit = { method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify({user})
                       };
        
        fetch('http://localhost:4000/registration', myInit).then( res => res.json()).then(response => {
            console.log(response);
            if (response.message === 'error') {
                dispatch(registrValue(true));
            } else {
                console.log('польватель зарегистрирован');
                self.props.history.push('/');
                dispatch(checkValue(false));
            }
        });
    };
};
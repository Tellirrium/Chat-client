import io from 'socket.io-client';

export const addUser = (user) => ({type:'ADD_USER', payload: user});
export const addMessage = (message) => ({type:'ADD_MESSAGE', payload: message});
export const addStyleCross = (className) => ({type:'ADD_CLASSNAME_CROSS', payload: className});
export const addStyleCheck = (className) => ({type:'ADD_CLASSNAME_CHECK', payload: className});
export const checkValue = (boolean) => ({type:'ADD_BOOL', payload: boolean});
export const registrValue = (boolean) => ({type:'ADD_BOOL2', payload: boolean});
export const wrongPassword = (boolean) => ({type:'ADD_BOOL3', payload: boolean});
export const getUsers = (users) => ({type:'SHOW_USERS', payload: users});

let socket;

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

                socket = io.connect('http://localhost:4000');

                socket.on('message', (data) => {
                    console.log(data);
                    dispatch(addMessage(data));
                });
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

export const showUsersFromBd = () => {
    return (dispatch) => {
        const myInit = { method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify({})
                       };

        fetch('http://localhost:4000/showUsers', myInit).then( res => res.json()).then(response => {
            console.log(response);
            
            dispatch(getUsers(response));
        });
    }
};

export const sendToken = (data, self) => {
    return (dispatch) => {
        const myInit = { method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify({data})
                       };

        console.log(data);

        fetch('http://localhost:4000/auth', myInit).then( res => res.json()).then(data => {
            if (data) {

                const person = {
                    name: data.name,
                    src: data.src
                };

                console.log(person);
                localStorage.person = person.name;
                localStorage.picture = person.src;

                dispatch(addUser(person));
                self.props.history.push('/chat');

                socket = io.connect('http://localhost:4000');

                socket.on('message', (data) => {
                    console.log(data);
                    dispatch(addMessage(data));
                });
                
            } else {
                dispatch(checkValue(true));
            }

        });
    };
};

export const sendMessage = (text, name) => {
    if (text) {
        socket.send({
          message: text,
          name: name
        });
    }
}

export const closeSocket = () => {
    socket.close();
}
const initialState = {
  user: {},
  messages: [],
  styleIconsCross: 'none',
  styleIconsCheck: 'none',
  value: false,
  registrationValue: false,
  password: false,
  users: []
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case 'ADD_USER':
      return { ...state, user: action.payload};

    case 'ADD_MESSAGE':
      return { ...state, messages: [ ...state.messages, action.payload]};

    case 'ADD_CLASSNAME_CROSS':
      return { ...state, styleIconsCross: action.payload};

    case 'ADD_CLASSNAME_CHECK':
        return { ...state, styleIconsCheck: action.payload};

    case 'ADD_BOOL':
        return { ...state, value: action.payload};

    case 'ADD_BOOL2':
        return { ...state, registrationValue: action.payload};

    case 'ADD_BOOL3':
        return { ...state, password: action.payload};

    case 'SHOW_USERS':
        return { ...state, users: action.payload};

    default:
      return state; 
  }
    
}
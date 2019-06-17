const initialState = {
  user: {},
  messages: []
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case 'ADD_USER':
      return { ...state, user: action.payload};

    case 'ADD_MESSAGE':
      return { ...state, messages: [ ...state.messages, action.payload]};

    default:
      return state; 
  }
    
  }
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Chat from './screens/Chat'



export default class App extends React.Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/chat' component={Chat}/>
      </Switch>
    );
  }
}

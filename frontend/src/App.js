import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Actions from './components/Actions';
import Deployment from './components/Deployment';
import Verify from './components/Verify';

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Deployment />
          <Verify />
          <Actions />
        </React.Fragment>
    );
  }
}

export default App;

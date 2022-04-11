import React, { Component } from 'react';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Main from './Main'
import Chatter from './components/Chatter'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Navigate,
  Routes,
} from "react-router-dom";

import { auth } from './firebase-config';


import 'bootstrap/dist/css/bootstrap.min.css';


function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return(
    authenticated === true
    ? <Component />
    : <Navigate to={{ pathname: '/login'} }/>
  )
  return(
    <Component/>
  )
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    authenticated === false ?
    <Component/>
    : <Navigate to='/chat' />
  )
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Navigate to='/chat' />}
    />
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          authenticated: false,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: true,
          loading: false,
        });
      }
    })
  }


  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" element={<Main/>}></Route>

            <Route exact path='/chat'
            element={<PrivateRoute authenticated={this.state.authenticated} component={Chatter}></PrivateRoute>}>
            </Route>

            <Route exact path='/signup'
            element={<PublicRoute  authenticated={this.state.authenticated} component={SignUp}></PublicRoute>}>
          </Route>

          <Route exact path='/login' element={<PublicRoute  authenticated={this.state.authenticated} component={Login}></PublicRoute>}>
            
          </Route>
            
        
          </Routes>
        </Router>
      </div>

    );
  }

}

export default App;

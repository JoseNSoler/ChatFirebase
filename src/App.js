import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import { auth } from './firebase-config';

//Pages

import Signup from './components/SignUp';
import Login from './components/Login';
import Chatter from './components/Chatter';

function PrivateRoute({ user, children }) {
  if(!user){
    return <Navigate to="/login" replace></Navigate>
  }
  return <Chatter/>;
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
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
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    })
  }

  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (
      <Router>
        <Routes>
          <Route exact path='/chat' element={<PrivateRoute authenticated={this.state.authenticated}/>}>
            
          </Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login"  element={<Login/>}></Route>
          <Route path="/"  element={<><h1>assadsadsda</h1></>}></Route>
        </Routes>
      </Router>
    );
  }

}

export default App;

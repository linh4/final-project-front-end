import React, { Component } from 'react';
import './App.css';
// import CameraContainer from './containers/CameraContainer'
import {Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import ImageContainer from './containers/ImageContainer'
import BillContainer from './containers/BillContainer'
import ItemFormContainer from './containers/ItemFormContainer'
import ItemEditForm from './components/ItemEditForm'
import HomePage from './containers/HomePage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import BillPage from './containers/BillPage'
import PayerFormContainer from './containers/PayerFormContainer'
import BillPayerContainer from './containers/BillPayerContainer'
import { currentUser } from './actions/userAction'


class App extends Component {

  componentDidMount(){
    const token = localStorage.getItem('token');
    if (token) {
        return this.props.currentUser(token)
    } else if (!token && this.props.currentUserI != null) {
        console.log("????")
    }
  }

  render() {
  //   if (!localStorage.getItem('token') && !this.props.currentUser.id) {
  //   return this.props.history.push('/login')}
    return (
      <div className="App">
        {localStorage.token && this.props.loggedIn ? (
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/bills/:id/upload" render={(routerProps) => <ImageContainer {...routerProps} /> } />
              <Route exact path="/bills/:id" render={(routerProps) => <BillContainer {...routerProps} /> } />
              <Route exact path="/bills/:id/edit" render={(routerProps) => <ItemFormContainer {...routerProps} />}  />
              <Route exact path="/items/:id/edit" render={(routerProps) => <ItemEditForm {...routerProps} />} />
              <Route exact path="/items/:id/payers" render={(routerProps) => <PayerFormContainer {...routerProps} />} />
              <Route exac path="/bills/:id/payers" render={(routerProps) => <BillPayerContainer {...routerProps} />} />
              <Route exact path="/login" component={HomePage} />
          </Switch>
          </div>
        )
          : (
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserI: state.user.currentUser,
    loggedIn: state.user.loggedIn
  };
}


export default withRouter(connect(mapStateToProps, {currentUser})(App))

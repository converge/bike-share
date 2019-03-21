import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SharedBike from '../SharedBike'
import Login from '../Login'
import { isAuthenticated } from "../../services/auth"

// check if user is logged in, if not, redirect to login page
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />
      )
    }
  />
)

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/auth/login' exact component={Login} />
          <PrivateRoute path='/' component={SharedBike} />
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

export default Routes
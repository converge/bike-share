import React, { Component } from 'react'
import GoogleMap from './googleMap'
import api from '../../services/api'
import { getUserId, getUsername } from '../../services/auth'
import { logout } from '../../services/auth'
import './style.css'

const BIKE_IN_USE = `Bike In Use !`
const FREE_TO_RENT = `You're free to rent !`

class SharedBike extends Component {

  state = {
    username: '',
    status: ''
  }

  componentDidMount = async () => {
    this.setState({
      username: getUsername()
    })
    const userStatus = await api.get('/cyclist/user_status', {
      params: {
        userId: getUserId()
      }
    })
    // if there is no bike in use by the user at the moment
    if (userStatus.status === 200 && userStatus.data !== null) {
      this.setState({
        status: BIKE_IN_USE
      })
    } else {
      // set user as free to rent
      this.setState({
        status: FREE_TO_RENT
      })
    }
  }

  handleLogout = () => {
    // remove JWT token
    logout()
    // redirect to login page
    this.props.history.push("/auth/login")
  }

  setUserFreeToRent = () => {
    this.setState({
      status: FREE_TO_RENT
    })
  }

  setUserAsBikeInUse = () => {
    this.setState({
      status: BIKE_IN_USE
    })
  }

  render() {
    return (
      <div className="rent-container">
        <div className="rent-wrapper">

          <div className="info-box">
            <div className="horizontal-logo-box"></div>
            <div className="user-info">
              <div className="info-a"><b>Username:</b> {this.state.username}</div>
              <div className="info-b"><b>Status:</b> {this.state.status}</div>
            </div>
          </div>

          <div className="map-share">
            <GoogleMap setUserFreeToRent={this.setUserFreeToRent} setUserAsBikeInUse={this.setUserAsBikeInUse} />
          </div>
          <div className="bottom-links">
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    )
  }
}

export default SharedBike


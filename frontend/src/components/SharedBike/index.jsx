import React, { Component } from 'react'
import GoogleMap from './googleMap'
import api from '../../services/api'
import { getUserId, getUsername } from '../../services/auth'
import { logout } from '../../services/auth'
import './style.css'

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
        status: userStatus.data.status
      })
    } else {
      // set bike as Bike in use
      this.setState({
        status: `You're free to rent !`
      })
    }
  }

  handleLogout = () => {
    // remove JWT token
    logout()
    // redirect to login page
    this.props.history.push("/auth/login")
  }

  render() {
    // more detailed information to the user
    let status = ''
    if (this.state.status === 'available') {
      status = 'Free to rent'
    } else if (this.state.status === 'in_use') {
      status = 'Using a bike'
    }
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
            <GoogleMap />
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


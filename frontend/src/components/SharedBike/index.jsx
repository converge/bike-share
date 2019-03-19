import React, { Component } from 'react'
import { logout } from '../../services/auth'
import GoogleMap from './googleMap'
import './style.css'

class SharedBike extends Component {

  handleLogout = () => {
    // remove JWT token
    logout()
    // redirect to login page
    this.props.history.push("/auth/login")
  }

  render() {
    return (
      <div className="rent-container">
        <div className="rent-wrapper">

          <div className="info-box">
            <div className="horizontal-logo-box"></div>
            <div className="user-info">
              <div className="info-a"><b>Username:</b> </div>
              <div className="info-b"><b>Status:</b> </div>
            </div>
          </div>

          <div className="map-share">
           <GoogleMap center={{ lat: 59.95, lng: 30.33 }} zoom={ 7 } />
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


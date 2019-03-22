import React, { Component } from 'react'
import api from '../../services/api'
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"
import InfoWindowEx from './infoWindowEx'
import PinActive from '../../imgs/pin_active.png'
import PinInactive from '../../imgs/pin_inactive.png'
import PinMyBike from '../../imgs/pin_my_bike.png'
import { getUserId } from '../../services/auth'
import './style.css'

export class GoogleMap extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    markers: {},
    activeBikeName: '',
    activeBikeId: '',
    activeBikeStatus: '',
    rentedBikeId: '',
    warningMsg: ''
  }

  componentDidMount = async () => {
    // retrieve all available bike, we will use this data to
    // create Pin Marks in the map
    const response = await api.get('/cyclist/list_bikes')
    if (response.status === 200) {
      // set initial icon (Pin Mark) to be displayed
      // based on current bike status
      response.data.map((item) => {
        if (item.status === 'in_use' && item.user_id === getUserId()) {
          // set rented bike id for later validation
          this.setState({
            rentedBikeId: item.id
          })
          item['iconURL'] = PinMyBike
        } else if (item.status === 'in_use') {
          item['iconURL'] = PinInactive
        } else {
          item['iconURL'] = PinActive
        }
      })
      // set updated bikes to component state
      this.setState({
        markers: response.data
      })
    }
  }

  onMarkerClick = async (props, marker, e) => {    
    // set current Pin Mark and load modal window
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    })
    // retrieve data from this specific bike
    const response = await api.get('/cyclist/bike_info', {
      params: {
        bikeId: props.id
      }
    })
    // make information about the selected bike
    // available to component state
    if (response.status === 200) {
      this.setState({
        activeBikeName: response.data.name,
        activeBikeId: response.data.id,
        activeBikeStatus: response.data.status
      })
    }
  }

  handleBikeRent = async (marker) => {
    // userId equal null means we're going to return the bike
    let userId = null
    let iconURL = PinActive

    // userId different than null means we're renting a new bike
    if (this.state.activeBikeStatus === 'available') {
      userId = getUserId()
      iconURL = PinMyBike
    }
    // validation
    if (userId === null && this.state.rentedBikeId !== this.state.activeBikeId) {
      this.setState({
        warningMsg: `Unable to return a bike you didn't rent.`
      })
      return
    }

    try {
      const response = await api.put('/cyclist/update_bike_status', {
        params: {
          // if user_id is null, it will free the bike to another user
          // if user_id is not null, it will try to rent the bike
          userId: userId,
          bikeId: this.state.activeBikeId
        }
      })
      // when we return the bike, it's time to
      // change the Pin Mark color (set as free to rent)
      if (response.status === 200) {
        let { markers } = this.state
        // locate the Mark, and point to the new Pin Mark color
        let stateMarker = markers.find(item => item.id === marker.id)
        stateMarker.iconURL = iconURL
        // update Pin Mark state
        this.setState({
          markers: markers,
          showingInfoWindow: false,
          rentedBikeId: this.state.activeBikeId
        })
      }
      // userId equal null means we're going to return the bike
      // userId different than null means we're renting a new bike
      (userId === null) ? this.props.setUserFreeToRent() : this.props.setUserAsBikeInUse()

    } catch (err) {
      // we're validating the renting process in the backend, if it fails,
      // we're catching it here and informing the user
      this.setState({
        warningMsg: `You're already using a bike.`
      })
    }
  }

  handleInfoWindowClose = () => {
    // clean warning message
    this.setState({
      warningMsg: ''
    })
  }

  render() {
    const actionButton = (this.state.activeBikeStatus === 'in_use') ?
      'Return This Bike' : 'Rent This Bike'
    return (
      <div>
        {/* Instantiate Google Maps */}
        <Map google={this.props.google}
          zoom={16}
          center={{ lat: 50.115286, lng: 8.631349 }}
          style={{ width: '100%', height: '100%', position: 'relative' }}>

          {/* Iterate over bikes available and create a Pin Mark on map */}
          {(this.state.markers.length > 0) && this.state.markers.map((item) => (
            <Marker
              key={item.id}
              id={item.id}
              position={{ lat: item.latitude, lng: item.longitude }}
              icon={{ url: item.iconURL }}
              onClick={this.onMarkerClick} />
          ))}

          {/* Modal window to display bike information */}
          <InfoWindowEx marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.handleInfoWindowClose}
          >
            <div className="bikerent-window">
              <h1>Bike Model: {this.state.activeBikeName}</h1>
              <ul>
                <li>1. Click on Rent This Bike !</li>
                <li>2. Bike will unlock automatically</li>
                <li>3. Adjust the bike</li>
              </ul>
              <p>{this.state.warningMsg}</p>
              <button onClick={this.handleBikeRent.bind(this, this.state.activeMarker)}>
                {actionButton}
              </button>
            </div>
          </InfoWindowEx>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(GoogleMap)
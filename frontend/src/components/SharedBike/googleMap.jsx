import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import api from '../../services/api'
import './style.css'

class GoogleMap extends Component {

  state = {
    showingInfoWindow: true,
    activeMarker: {},
    markers: {}
  }

  componentDidMount = async () => {
    const response = await api.get('/cyclist/list_bikes')
    if (response.status === 200) {
      this.setState({
        markers: response.data
      })
    }
  }

  onMarkerClick = (props, marker, e) => {
    console.log('ok')
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker
    })
  }

  onMarkerClick2 = () => {
    console.log('ok2')
  }


  render() {
      return (
        <div>
          <Map google={this.props.google}
            center={{ lat: 46.903480, lng: 6.781185 }}
            zoom={18}
            style={{ width: '100%', height: '100%', position: 'relative' }}>

            {(this.state.markers.length > 0) && this.state.markers.map((item) => (
              <Marker
                key={item.id}
                name={'Dolores park'}
                position={{ lat: item.latitude, lng: item.longitude }}
                onClick={this.onMarkerClick} />
            ))}

            <InfoWindow marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
              <div>
                {/* <h1>{this.state.selectedPlace.name}</h1> */}
                <h1>Hello</h1>
              </div>
            </InfoWindow>
          </Map>
        </div>
      )
    }
  }

  export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
}) (GoogleMap)
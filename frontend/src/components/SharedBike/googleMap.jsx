import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import './style.css'

class Marker extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div className="SuperAwesomePin">www1</div>
      </div>
    )
  }
}

class GoogleMap extends Component {


  render() {  
    return (
      <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        /> */}
        <Marker lat={this.props.center.lat} lng={this.props.center.lng} />
      </GoogleMapReact>
    </div>
    )
  }
}

export default GoogleMap
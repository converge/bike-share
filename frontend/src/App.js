import React, { Component } from 'react'
import Favicon from 'react-favicon'
import Helmet from 'react-helmet'
import { BrowserRouter } from 'react-router-dom'
import Routes from './components/Routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Favicon url='./favicon.ico' />
        <Helmet>
          <title>Node Bike</title>
        </Helmet>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    )
  }
}

export default App

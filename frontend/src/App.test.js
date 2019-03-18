import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-testing-library'
import Login from './components/Login'
import SharedBike from './components/SharedBike'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Login />, div)
  ReactDOM.unmountComponentAtNode(div)
})


describe('Componets render test', () => {
  test('it should render Login component', () => {
    render(<Login />)
  })

  test('it should render SharedBike component', () => {
    render(<SharedBike />)
  })

})
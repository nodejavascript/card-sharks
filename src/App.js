import React from 'react'
import ReactGA from 'react-ga4'

import './App.css'

import SiteWrapper from './components/SiteWrapper'
import Site from './site/Site'

const { REACT_APP_MEASUREMENT_ID } = process.env

const App = () => {
  ReactGA.initialize(REACT_APP_MEASUREMENT_ID)
  return (
    <div style={{ height: '100vh' }}>
      <SiteWrapper>
        <Site />
      </SiteWrapper>
    </div>
  )
}

export default App

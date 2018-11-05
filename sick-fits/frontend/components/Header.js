import React, { Fragment } from 'react'
import Nav from './Nav'

const Header = () => {
  return (
    <Fragment>
      <div className="bar">
        <a href="">Sick Fits</a>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </Fragment>
  )
}

export default Header

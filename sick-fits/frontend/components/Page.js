import React, { Component, Fragment } from 'react'
import Header from './Header'
import Meta from './Meta'

class Page extends Component {
  render() {
    return (
      <Fragment>
        <Meta />
        <Header />
        <p>This is on every page</p>
        {this.props.children}
      </Fragment>
    )
  }
}

export default Page

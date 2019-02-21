import React, { Fragment } from 'react'
import Link from 'next/link'

import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'

const Nav = () => {
  return (
    <User>
      {({ data }) => {
        const { currentUser } = data

        return (
          <NavStyles>
            <Link href="/items">
              <a>Shop</a>
            </Link>
            {currentUser && (
              <Fragment>
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
                <Link href="/me">
                  <a>Account</a>
                </Link>
                <Signout />
              </Fragment>
            )}
            {!currentUser && (
              <Link href="/signup">
                <a>Sign In</a>
              </Link>
            )}
          </NavStyles>
        )
      }}
    </User>
  )
}

export default Nav

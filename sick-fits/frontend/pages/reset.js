import { Fragment } from 'react'
import Link from 'next/link'

import Reset from '../components/Reset'

const resetPage = props => (
  <Fragment>
    <p>Reset Your Password</p>
    <Reset resetToken={props.query.resetToken} />
  </Fragment>
)

export default resetPage

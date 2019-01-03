import { Fragment } from 'react'

import UpdateItem from '../components/UpdateItem'

const Sell = ({ query }) => (
  <Fragment>
    <UpdateItem id={query.id} />
  </Fragment>
)

export default Sell

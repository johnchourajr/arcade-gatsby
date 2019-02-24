import React from 'react'
import { Link } from 'gatsby'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ContextConsumer from '../../layouts/context'
import CartTable from '../../components/checkout/CartTable'
import { ReturnFieldsCheckout } from '../../helpers/gqlFragments'

const CART_ITEMS = gql`
query checkoutQuery($id: ID!) {
  node(id: $id) {
    ... on Checkout {
      ...ReturnFieldsCheckout
    }
  }
}
${ReturnFieldsCheckout}
`

const emptyCart = (
  <React.Fragment>
    <p>
      Your cart is currently empty.
    </p>
    <Link to={`/`}>
      Continue Shopping
    </Link>
  </React.Fragment>
)

// TODO: Abstract into helper function.Will be used for sharing carts
const checkoutUrl = (storeProvider) => {
  let url = storeProvider.checkout.webUrl

  return url;
}

const Cart = () => (
  <React.Fragment>
    <h1>
      Your Cart
    </h1>
    <ContextConsumer>
      {({ store }) => {
        if (!store.checkout || store.cartCount === 0) {
          return emptyCart
        }

        return (
          <React.Fragment>
            <CartTable
              products={store.checkout.lineItems}
              subtotalPrice={store.checkout.subtotalPrice}
              totalTax={store.checkout.totalTax}
              totalPrice={store.checkout.totalPrice}
              />
            <Link to={`/`}>
              Continue Shopping
            </Link>
            <br/>
            <a href={checkoutUrl(store)}>
              Go to Checkout
            </a>
          </React.Fragment>
        )
      }}
    </ContextConsumer>
  </React.Fragment>
)

export default Cart

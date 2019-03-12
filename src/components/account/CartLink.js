import React from 'react'
import { Link } from 'gatsby'
import ContextConsumer from '../../layouts/context'

const CartLink = () => (
    <ContextConsumer>
        {({ set, store }) => {
            return (
                <React.Fragment>
                    &nbsp;
                    <Link
                        to="/cart"
                        onClick={() => {
                            set({
                                isCartOpen: true,
                            })
                        }}
                    >Cart ({store.cartCount})</Link>
                </React.Fragment>
            )
        }}
    </ContextConsumer>
)

export default CartLink
import React from 'react'
import CartCard from './CartCard'

import './CartList.css'

export default class CartList extends React.Component {

    render(){

        const distributeCartItems = this.props.cart.map((item, index) =>
            <CartCard
                key={index}
                item={item}
                removeFromCart={this.props.removeFromCart}
            />
        )

        return(
            <div>
                { distributeCartItems }
            </div>
        )
    }
}
import React from 'react'
import CartCard from './CartCard'

import './CartList.css'

export default class CartList extends React.Component {


    componentDidMount(){
        fetch('http://localhost:3001/cart_items')
        .then(r => r.json())
        .then(res => {
            
            const arr = res.data.filter(item => {
                // console.log(item.attributes.user.id)
                return item.attributes.user.id === parseInt(this.props.user)
            })
            this.props.setUserIdToCart(arr)
        })
    }

    render(){
        console.log(this.props.cart.length)
        const distributeCartItems = this.props.cart.length >0? this.props.cart.map((item, index) =>
            <CartCard
                key={index}
                item={item}
                removeFromCart={this.props.removeFromCart}
            />
        )
        :
        (<h4 style={{"color":"red", "margin-top": "40px"}}>You don't have anything in your cart right now. Get to it!</h4>)


        return(
            <div>
                { distributeCartItems }
            </div>
        )
    }
}
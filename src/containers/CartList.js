import React from 'react'
import CartCard from '../pages/CartCard'
import { Link } from 'react-router-dom'

export default class CartList extends React.Component {

    state = {
        cart: []
    }

    componentDidMount() {
        fetch('http://localhost:3001/cart_items')
            .then(r => r.json())
            .then(res => {
                const arr = res.data.filter(item => {
                    return item.attributes.user.id === parseInt(this.props.user)
                })
                this.props.setUserIdToCart(arr)
            })
    }

    render() {
        const distributeCartItems = this.props.cart.length > 0 ? this.props.cart.map((item, index) =>
            <CartCard
                key={index}
                item={item}
                removeFromCart={this.props.removeFromCart}
                user={this.props.user}
                showDetails={this.props.showDetails}
            />
            )
            :
            <Link to='/marketplace'>
                <h2 style={{ color: "black", marginTop: "50px", textAlign: "center" }}>You don't have anything in your cart right now!</h2></Link>
        return (
            <div>
                {distributeCartItems}
            </div>
        )
    }
}
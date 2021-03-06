import React from 'react'
import axios from 'axios'
import '../styling/CartCard.css'
import { Link } from 'react-router-dom'
export default class CartCard extends React.Component {

    state = {
        cart_quantity: null
    }

    componentDidMount() {
        fetch(`http://localhost:3001/cart_items/${this.props.item.id}`)
            .then(res => res.json())
            .then(res_obj => {

                this.setState({
                    cart_quantity: res_obj.data.attributes.cart_quantity
                })
            }
            )
    }

    onClickFunctionsRemoveFromCart = () => {
        this.props.removeFromCart(this.props)
    }

    onClickFunctionsAddQuantity = () => {
        let quantity = this.state.cart_quantity

        this.setState({
            cart_quantity: quantity += 1
        })
    }

    onClickFunctionsRemoveQuantity = () => {
        let quantity = this.state.cart_quantity
        if (quantity > 1) {
            this.setState({
                cart_quantity: quantity -= 1
            })
        }
    }

    onClickFunctionsUpdateQuantity = () => {
        axios.patch(`http://localhost:3001/cart_items/${this.props.item.id}`, {
            cart_quantity: this.state.cart_quantity

        })
    }


    render() {
        const cartItem = this.props.item.attributes.item
        return (
            <div  className="cart_card">
                <div className="item_name_picture_price" onClick={() => this.props.showDetails(this.props.item.attributes.item)}>
                    {cartItem.name}
                    <br /><Link to='/detail'>
                    <img  src={cartItem.img_url} alt="test_img" />
                            </Link>
                </div>
                <div className="item_price">
                    ${cartItem.price}/each
				</div>
                <div className="item_quantity">
                    Quantity: {this.state.cart_quantity}
                    <button onClick={this.onClickFunctionsAddQuantity}>+</button>
                    <button onClick={this.onClickFunctionsRemoveQuantity}>-</button>
                    <button onClick={this.onClickFunctionsUpdateQuantity}>Update Quantity</button>
                </div>
                <div className="cart_remove_button">
                    <button onClick={this.onClickFunctionsRemoveFromCart}>Remove From Cart</button>
                </div>
            </div>
        )
    }
}
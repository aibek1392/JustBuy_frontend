import React from 'react'
import axios from 'axios'
import '../styling/CartCard.css'

export default class CartCard extends React.Component {

    state = {
        cart_quantity: null
    }



    componentDidMount(){
        fetch(`http://localhost:3001/cart_items/${this.props.item.id}`)
        .then(res => res.json())
        .then(res_obj =>
            this.setState({
                cart_quantity: res_obj.cart_quantity
            })
        )
       
    }

    // componentWillMount(){
    //     fetch(`http://localhost:3001/cart_items.`)
    //     .then(r => r.json())
    //     .then(r => {
    //         console.log(r)
    //         this.setState({
    //             cart: [...this.state.cart, r.cart_items]
    //         })
    //     })
    // }


    // componentDidMount(){
    //     fetch('http://localhost:3001/cart_items')
    //     .then(r => r.json())
    //     .then(res => {
            
    //         const arr = res.data.filter(item => {
    //             // console.log(item.attributes.user.id)
    //             return item.attributes.user.id === parseInt(this.props.user)
    //         })
    //         // this.props.setUserIdToCart(arr)
    //         // this.props.length(this.props.cart.length)
    //         this.setState({
    //             cart: arr
    //         })
    //     })
    // }





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

        this.setState({
            cart_quantity: quantity -= 1
        })
    }

    onClickFunctionsUpdateQuantity = () => {
        // if (this.state.cart_quantity === 0) {}
        axios.patch(`http://localhost:3001/cart_items/${this.props.item.id}`, {
                cart_quantity: this.state.cart_quantity
            
        })
    }

    render(){
        // console.log(this.props.item.attributes.item.name)
    //    const name  = this.state.cart.map(cart => {
    //      return  <li>{cart.attributes.item.name}</li> 
    //    })
    // console.log(this.state.cart)
    // const itemCard = this.state
        // const cartItem = this.props.item.attributes.item

        return(
            <div className="cart_card">
				<div className="item_name_picture_price">
               		{this.props.item.attributes.item.name}
                <br />
             	   {/* <img src={ cartItem.img_url } alt="test_img"/> */}
				</div>
				<div className="item_price">
		        {/* ${ cartItem.price }/each */}
				</div>
				<div className="item_quantity">
		            {/* Quantity: { this.state.cart_quantity } */}
		            <button onClick={ this.onClickFunctionsAddQuantity }>+</button>
		            <button onClick={ this.onClickFunctionsRemoveQuantity }>-</button>
		            <button onClick={ this.onClickFunctionsUpdateQuantity }>Update Quantity</button>
                </div>
				<div className="cart_remove_button">
                <button onClick={this.onClickFunctionsRemoveFromCart }>Remove From Cart</button>
				</div>
			</div>
        )
    }
}
import React from 'react'
import CartCard from '../pages/CartCard'
import {Link} from 'react-router-dom'
import '../styling/CartList.css'

export default class CartList extends React.Component {


    state = {
        cart : []
    }



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


    // componentDidMount(){
    //     fetch('http://localhost:3001/cart_items')
    //     .then(r => r.json())
    //     .then(res => {
            
    //         const arr = res.data.filter(item => {
    //             // console.log(item.attributes.user.id)
    //             return item.attributes.user.id === parseInt(this.props.user)
    //         })
    //         // this.props.setUserIdToCart(this.state.cart.length)
    //         // this.props.length(this.props.cart.length)
    //         this.setState({
    //             cart: arr
    //         })
    //     })
    // }
    
    // quanTity = () => {
    //     this.props.quanT(this.state.cart.length)
    // }
    

    removeFromCart = (cart_item) => {
        // console.log(this.state.cart)
        fetch(`http://localhost:3001/cart_items/${cart_item.item.id}`, {
          method: "DELETE"
        })
          .then(
            this.setState({
              cart: this.state.cart.filter(item => console.log(item.id) || item.id !== cart_item.item.id)
            })
          )
      }



    render(){
        // console.log(this.props.user)
        console.log(this.state.cart.length)
        const distributeCartItems = this.props.cart.length >0? this.props.cart.map((item, index) =>
                // console.log(item) ||
            <CartCard
                key={index}
                item={item}
                removeFromCart={this.props.removeFromCart}
                user={this.props.user}
            />
        )
        :
        <Link to='/marketplace'>
        <h2 style={{color:"black", marginTop: "50px", textAlign: "center"}}>You don't have anything in your cart right now!</h2></Link>


        return(
            <div>
                { distributeCartItems }
            </div>
        )
    }
}
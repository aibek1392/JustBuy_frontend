import React from 'react'
import Header from './Header'
import LogIn from './LogIn'
import SignUp from './SignUp'
import ItemsContainer from './ItemsContainer'
// import { Route, Switch } from 'react-router-dom'

import './App.css'

export default class App extends React.Component {

  state = {
    token: null,
    loggedInUserId: null,
	username: null,
    cart: [],
    display: 'Login',
  }

  componentDidMount(){
    if (!localStorage.userId || !localStorage.token)  {
      localStorage.clear()
    } else {

      this.setState({
        token: localStorage.token,
        loggedInUserId: localStorage.userId,
		username: localStorage.username,
        cart: this.updateCart()
      })
    }
  }

  setToken = ({ token, user_id, username })  =>{

    localStorage.token = token
    localStorage.userId = user_id
	localStorage.username = username

    this.setState({
      token: token,
      loggedInUserId: user_id
    })
  }

	getUser = (user) => {
    console.log(user)
		this.setState({
			username: user.username
		})
	}

  addToCart = (item) => {
   fetch("http://localhost:3001/cart_items", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      user_id: this.state.loggedInUserId,
      item_id: item,
      cart_quantity: 1
    })
   })
   .then(response => response.json())
   .then(res_obj =>
      this.setState({
        cart: this.updateCart()
      })
    )
  }

  removeFromCart = (cart_item) => {
    fetch(`http://localhost:3001/cart_items/${cart_item.item.id}`, {
      method: "DELETE"
    })
    .then(
      this.setState({
        cart: this.state.cart.filter(item => item.id !== cart_item.item.id)
      })
    )
  }

  updateCart = () => {
   fetch("http://localhost:3001/cart_items")
    .then(response => response.json())
    .then((res_obj) => {
      this.setState({
        cart: res_obj.data.filter(item => item.attributes.user.id === parseInt(this.state.loggedInUserId, 10))
      })
    })
  }

  displayCart = () => {
    this.setState({
      display: 'Cart'
    })
  }

  displayItems = () => {
    this.setState({
      display: 'Items'
    })
  }

  displayLogin = () => {
    this.setState({
      display: 'Login'
    })
  }

  displaySignUp = (event) => {
    this.setState({
      display: 'SignUp'
    })
  }

  logOut = () => {
    localStorage.clear()
    this.setState({
      loggedInUserId: null,
      token: null,
      cart: []
    })
  }

  render(){
  
    const showHeader =
      <Header
        token={ this.state.token }
		getUser={ this.state.username }
        displayLogin={ this.displayLogin }
        displayCart={ this.displayCart }
        displayItems={ this.displayItems }
        logOut={ this.logOut }
      />

    const showItemsContainer =
      <ItemsContainer
        token={ this.state.token }
        user={ this.state.loggedInUserId }
        display={ this.state.display }
        cart={this.state.cart}
        addToCart={ this.addToCart }
        removeFromCart={ this.removeFromCart }
      />

    const showLogIn =
      <LogIn
        setToken={ this.setToken }
		getUser={ this.getUser }
        displayLogin={ this.displayLogin }
        displayItems={ this.displayItems }
        updateCart={ this.updateCart }
        displaySignUp={ this.displaySignUp }
      />

    const showSignUp =
      <SignUp
        setToken={ this.setToken }
        displayLogin={ this.displayLogin }
        displayItems={ this.displayItems }
        updateCart={ this.updateCart }
      />

    return (
      <>
        <div className="Header">
          { showHeader }
        </div>
		<div className="main_wrapper">
        {
          {
            true: showItemsContainer,
            false: (() => {
              switch(this.state.display) {
                case 'SignUp':
                  return showSignUp;
                case 'Login':
                  return showLogIn;
                default:
                  return null;
              }
            })()
          }[!!this.state.token]
        }
		</div>
      </>
    )
  }
}

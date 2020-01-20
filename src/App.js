import React from 'react'
import Header from './pages/Header'
import LogIn from './LogIn'
import SignUp from './SignUp'
import CartList from './CartList'
import ItemsContainer from './ItemsContainer'
import { withRouter, Route, Redirect, Switch } from 'react-router-dom'

import './App.css'

class App extends React.Component {

  state = {
    token: localStorage.token,
    loggedInUserId: localStorage.userId,
    username: localStorage.username,
    cart: [],
    display: 'Login',
  }



  setToken = ({ token, user_id, username }) => {

    localStorage.token = token
    localStorage.userId = user_id
    localStorage.username = username

    this.setState({
      token: token,
      loggedInUserId: user_id,
      username: username
    })
  }
  // get userName
  getUser = (user) => {
    console.log(user)
    this.setState({
      username: user.username
    })
  }

  addToCart = (item) => {
    // const matched = this.state.cart.find(match => match.attributes.item.id === item)
    //   if (!matched) {
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
        .then(res_obj => {
          // this.setState({
          //   cart: [...this.state.cart, res_obj]
          // })
        }
        )
    // } else {
    //   alert("fuck")
    // }
  }

  setUserIdToCart = (arr) => {
    // console.log(arr.map(arr))
    // const arrR =  arr.map( www => {
    //   return   www.attributes.item.id
    // })
    // const matched = this.state.cart.map(match =>{
    //   return match.attributes.item.id
    // })
    // console.log(matched)
  // const arrId = arr.flter(item.attributes.item.id)
    // if(matched.includes){
      // if(this.state.cart.includes(arr)){
    this.setState({
      cart: arr
    })
  // }
  }
  // updateCart = () => {
  //   fetch("http://localhost:3001/cart_items")
  //     .then(response => response.json())
  //     .then((res_obj) => {
  //       this.setState({
  //         cart: res_obj.data.filter(item => item.attributes.user.id === this.state.loggedInUserId)
  //       })
  //     })
  // }

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


  // displayCart = () => {
  //   this.setState({
  //     display: 'Cart'
  //   })
  // }

  // displayItems = () => {
  //   this.setState({
  //     display: 'Items'
  //   })
  // }

  // displayLogin = () => {
  //   this.setState({
  //     display: 'Login'
  //   })
  // }

  // displaySignUp = (event) => {
  //   this.setState({
  //     display: 'SignUp'
  //   })
  // }

  logOut = () => {
    localStorage.clear()
    this.setState({
      loggedInUserId: null,
      token: null,
      cart: []
    })
  }

  render() {





    // const showItemsContainer =
    //   <ItemsContainer
    //     token={this.state.token}
    //     user={this.state.loggedInUserId}
    //     display={this.state.display}
    //     cart={this.state.cart}
    //     addToCart={this.addToCart}
    //     removeFromCart={this.removeFromCart}
    //   />

    return (
      <React.Fragment>
        <div className="Header">
          <Header token={this.state.token}
            getUser={this.state.username}
            displayLogin={this.displayLogin}
            displayCart={this.displayCart}
            displayItems={this.displayItems}
            logOut={this.logOut}

          />
        </div>
        <Switch>
          <div >
            <Route exact path={'/'} render={(props) =>
              <LogIn {...props}
                setToken={this.setToken}
                getUser={this.getUser}
                displayLogin={this.displayLogin}
                displayItems={this.displayItems}
                updateCart={this.updateCart}
                displaySignUp={this.displaySignUp} />}
            />
            <Route exact path={'/signup'} component={(props) =>
              <SignUp {...props}
                updateCart={this.updateCart}
                setToken={this.setToken} />}
            />
            <Route exact path={'/marketplace'} render={(props) => <ItemsContainer {...props}
              token={this.state.token}
              user={this.state.loggedInUserId}
              display={this.state.display}
              cart={this.state.cart}
              addToCart={this.addToCart}
              removeFromCart={this.removeFromCart} />}
            />
            <Route exact path={'/mycart'} render={(props) => <CartList {...props}
              user={this.state.loggedInUserId}
              cart={this.state.cart}
              setUserIdToCart={this.setUserIdToCart}
              removeFromCart={this.removeFromCart} />}
            />
            {/* {
            {
              true: showItemsContainer,
              false: (() => {
                switch (this.state.display) {
                  case 'SignUp':
                    return showSignUp;
                    case 'Login':
                      return showLogIn;
                      default:
                        return null;
                      }
                    })()
                  }[!!this.state.token]
                } */}
          </div>
        </Switch>
        {this.state.token ? "" : <Redirect to='/' />}
      </React.Fragment>
    )
  }
}



export default withRouter(App);
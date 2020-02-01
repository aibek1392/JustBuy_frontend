import React from 'react'
import Header from './pages/Header'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import CartList from './containers/CartList'
import ItemsContainer from './containers/ItemsContainer'
import { withRouter, Route, Redirect, Switch } from 'react-router-dom'
import CreatItem from './pages/CreatItem'
import Detail from './pages/Detail'
import './App.css'
import { withAlert } from "react-alert";

class App extends React.Component {

  state = {
    token: localStorage.token,
    loggedInUserId: localStorage.userId,
    username: localStorage.username,
    cart: [],
    cart_length: localStorage.cart_length,
    showDetails: []
  }

  componentDidMount() {
    fetch("http://localhost:3001/items")
      .then(res => res.json())
      .then(res_obj => {
        const slicedData = res_obj.sort((a, b) => b.id - a.id);
        this.setState({
          items: slicedData,
          showItems: res_obj.data
        })
      }
      )
  }

  filterItems = (term) => {
    this.setState({
      showFilteredItems: term
    })
  }

  whichItemsToRender = () => {
    if (this.state.showFilteredItems === "All") {
      return this.state.items
    } else {
      return this.state.items.filter(item => item.attributes.category === this.state.showFilteredItems)
    }
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  setToken = ({ token, user_id, username, total }) => {
    localStorage.token = token
    localStorage.userId = user_id
    localStorage.username = username

    this.setState({
      token: token,
      loggedInUserId: user_id,
      username: username,
      cart_length: total.length
    })
  }

  setLength = (data) => {
    localStorage.cart_length = data
    this.setState({
      cart_length: data
    })
  }

  getUser = (user) => {
    this.setState({
      username: user.username
    })
  }

  addToCart = (cartItem) => {
    const matched = this.state.cart.find(match => match.attributes.item.id === cartItem.id)
    if (!matched) {
      fetch("http://localhost:3001/cart_items", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          user_id: this.state.loggedInUserId,
          item_id: cartItem.id,
          cart_quantity: 1
        })
      })
        .then(response => response.json())
        .then(res_obj => {
          this.setState({
            cart: [...this.state.cart, res_obj.data],
            cart_length: parseInt(this.state.cart_length) + 1,
          })
        }
        )
      this.props.alert.show(<div style={{ color: 'green' }}>Item has been added!</div>);
    } else {
      this.props.alert.show(<div style={{ color: 'red' }}>You already have this item</div>);
    }
  }
  
  setUserIdToCart = (arr) => {
    this.setState({
      cart: arr
    })
  }

  addItem = (newItem) => {
    fetch("http://localhost:3001/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newItem
      })
    })
      .then(r => r.json())
      .then(r => {
      })
  }

  removeFromCart = (cart_item) => {
    fetch(`http://localhost:3001/cart_items/${cart_item.item.id}`, {
      method: "DELETE"
    })
      .then(
        this.setState(prevState => ({
          cart: this.state.cart.filter(item => item.id !== cart_item.item.id),
          cart_length: parseInt(this.state.cart_length) - 1
        }))
      )
  }
 
  showDetails = (item) => {
    this.setState({
      showDetails: item
    })
  }

  goShopping = () => {
    this.setState({
      showDetails: null
    })
  }

  logOut = () => {
    localStorage.clear()
    this.setState({
      loggedInUserId: null,
      token: null,
      cart: [],
      cart_length: null
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="Header">
          <Header token={this.state.token}
            setLength={this.setLength}
            cartLength={this.state.cart_length}
            getUser={this.state.username}
            logOut={this.logOut}
            userId={this.state.loggedInUserId}
          />
        </div>
        <Switch>
          <div >
            <Route exact path={'/create_item'} component={(props) =>
              <CreatItem {...props}
                addItem={this.addItem}
              />}
            />
            <Route exact path={'/detail'} render={(props) =>
              <Detail {...props}
                singleItem={this.state.showDetails}
                addToCart={this.addToCart}
                goShopping={this.goShopping}
               />}
            />
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
              showDetails={this.showDetails}
              cart={this.state.cart}
              addToCart={this.addToCart}
              removeFromCart={this.removeFromCart} />}
            />
            <Route exact path={'/mycart'} render={(props) =>
              <CartList {...props}
                user={this.state.loggedInUserId}
                cart={this.state.cart}
                length={this.length}
                showDetails={this.showDetails}
                setUserIdToCart={this.setUserIdToCart}
                removeFromCart={this.removeFromCart}
              />}
            />
          </div>
        </Switch>
        {this.state.token ? "" : <Redirect to='/' />}
      </React.Fragment>
    )
  }
}

export default withAlert()(App);
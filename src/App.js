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
import axios from 'axios'
class App extends React.Component {

  state = {
    token: localStorage.token,
    loggedInUserId: localStorage.userId,
    username: localStorage.username,
    cart: [],
    cart_length: localStorage.cart_length,

    showDetails: []
  }

  // state = {
  //   items: [],
  //   showItems: [],
  //   showFilteredItems: "All"
  // }

  componentDidMount() {
    fetch("http://localhost:3001/items")
      .then(res => res.json())
      .then(res_obj => {
        console.log(res_obj)
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

  setLength = (data) => {
    // console.log(data)
    localStorage.cart_length = data
    // if (this.state.cart.length > 0) {
    this.setState({
      cart_length: data
    })

    // } 
  }

  // componentDidUpdate(prevState, prevProps) {
  //   	if (this.state.cart_length !== this.state.cart.length) {
  //   		return true
  //   	}
  //   }

  // get userName
  getUser = (user) => {
    console.log(user)
    this.setState({
      username: user.username
    })
  }





  //   componentDidMount(){
  //     fetch('http://localhost:3001/cart_items')
  //     .then(r => r.json())
  //     .then(res => {

  //         const arr = res.data.filter(item => {
  //             // console.log(item.attributes.user.id)
  //             return item.attributes.user.id === parseInt(this.state.loggedInUserId)
  //         })
  //         // this.props.setUserIdToCart(this.state.cart.length)
  //         // this.props.length(this.props.cart.length)
  //         this.setState({
  //             cart: arr
  //         })
  //     })
  // }



  addToCart = (item) => {
    // localStorage.cart_item += 1
    // console.log(item)
    const matched = this.state.cart.find(match =>  match.attributes.item.id === item.id)
    if (!matched) {
          this.setState({
            cart: [...this.state.cart, item]
          })
    fetch("http://localhost:3001/cart_items", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        user_id: this.state.loggedInUserId,
        item_id: item.id,
        cart_quantity: 1
      })
    })
      .then(response => response.json())
      .then(res_obj => {
        
        this.setState({
          cart_length: parseInt(this.state.cart_length) + 1,
        })
      }
      )
    } else {
      alert("fuck")
    }
  }
  // componentDidMount() {
  //   return	fetch(`http://localhost:3001/users/${this.state.loggedInUserId}`)
  // 		.then(r => r.json())
  // 		.then(data => {
  //       // console.log(data.cart_items.length)
  //       this.setLength(data.cart_items.length)
  // 			// console.log("fafa",prevState)
  // 			// this.setState(prevState => ({ 
  // 			// 	cart_length: [prevState, data.cart_items.length]
  //       // })
  //       // )
  //     })
  //     // console.log(prevState)
  // }

  // componentDidUpdate(prevState, prevProps) {
  //   // console.log(prevState)
  // 	if (prevState.length !== this.state.cart_length) {
  // 		return true
  // 	}
  // }




  setUserIdToCart = (arr) => {
    console.log("USERCART", arr)
    // }
    //   console.log(arr)
    //   // console.log(arr.map(arr))
    //   // const arrR =  arr.map( www => {
    //   //   return   www.attributes.item.id
    //   // })
    //   // const matched = this.state.cart.map(match =>{
    //   //   return match.attributes.item.id
    //   // })
    //   // console.log(matched)
    // // const arrId = arr.flter(item.attributes.item.id)
    //   // if(matched.includes){
    //     // if(this.state.cart.includes(arr)){
    this.setState({
      cart: arr
    })
    // // }
  }

  addItem = (newItem) => {
    console.log(newItem)
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
        console.log("APP JS", r)
      })
  }

  // updateCart = () => {
  //   fetch("http://localhost:3001/cart_items")
  //     .then(response => response.json())
  //     .then((res_obj) => {
  //       this.setState({
  //         cart: res_obj.data.filter(item => item.attributes.user.id === this.state.loggedInUserId)
  //       })
  //     })
  // }\

  // componentDidMount(){
  //   fetch(`http://localhost:3001/cart_items/${cart_item.item.id}`)

  // }
  


  removeFromCart = (cart_item) => {
    console.log(cart_item)
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
  // this.setState(prevState => ({
  //   				cart_length: [...this.state.cart_length, data.cart_items.length]
  //   			}))
  showDetails = (item) => {
    this.setState({
      showDetails: item
      })
  }

  goShopping = () => {
    this.props.history.push('/marketplace')
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
    console.log("STATEOFCART", this.state.cart)
    return (
      <React.Fragment>
        {/* {this.state.cart_length !== this.state.cart.length ? this.setLent() : null} */}
        <div className="Header">
          <Header token={this.state.token}
            cart={this.state.cart}
            setLength={this.setLength}
            cartLength={this.state.cart_length}
            getUser={this.state.username}
            displayLogin={this.displayLogin}
            // displayCart={this.displayCart}
            displayItems={this.displayItems}
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
            {/* {this.state.singleItem ?  */}
            <Route exact path={'/detail'} render={(props) =>
              <Detail {...props}
                singleItem={this.state.showDetails}
                addToCart={this.addToCart}
                goShopping={this.goShopping}
                displaySignUp={this.displaySignUp} />}
            />
            :
            {/* <Redirect to="/marketplace" />} */}
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

              // terms={this.state.showFilteredItems}
              // filterItems={this.filterItems}
              // items={this.whichItemsToRender()}
              // itemsForFilter={this.state.showItems}
              // addToCart={this.props.addToCart}
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
                setUserIdToCart={this.setUserIdToCart}
                removeFromCart={this.removeFromCart}
              />}
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
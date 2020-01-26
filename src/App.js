import React from 'react'
import Header from './pages/Header'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import CartList from './containers/CartList'
import ItemsContainer from './containers/ItemsContainer'
import { withRouter, Route, Redirect, Switch } from 'react-router-dom'
import CreatItem from './pages/CreatItem'
import './App.css'

class App extends React.Component {

  state = {
    token: localStorage.token,
    loggedInUserId: localStorage.userId,
    username: localStorage.username,
    cart: [],
    cart_length: localStorage.cart_length,
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

  setLength = ( data) => {
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
    // this.setState({
    //   cart: [...this.state.cart, item]
    // })
    // console.log(item)
    // const matched = this.state.cart.find(match => match.attributes.item.id === item)
    //   if (!matched) {
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
          
          // this.setLent(res_obj)
          this.setState({
            cart_length: parseInt(this.state.cart_length) + 1
          })
        }
        )
    // } else {
    //   alert("fuck")
    // }
  }
  componentDidMount() {
	  return	fetch(`http://localhost:3001/users/${this.state.loggedInUserId}`)
			.then(r => r.json())
			.then(data => {
        // console.log(data.cart_items.length)
        this.setLength(data.cart_items.length)
				// console.log("fafa",prevState)
				// this.setState(prevState => ({ 
				// 	cart_length: [prevState, data.cart_items.length]
        // })
        // )
      })
      // console.log(prevState)
	}

	// componentDidUpdate(prevState, prevProps) {
  //   // console.log(prevState)
	// 	if (prevState.length !== this.state.cart_length) {
	// 		return true
	// 	}
	// }




  setUserIdToCart = (arr) => {
    // console.log("app",arr)
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
    // console.log("APP JS", newItem)
     return fetch("http://localhost:3001/items", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        ...newItem
      })
    })
    .then(r => r.json())
    .then( r => {
      console.log("APP JS",r)
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
        this.setState(prevState =>  ({
          cart: this.state.cart.filter(item =>  item.id !== cart_item.item.id),
          cart_length: parseInt(this.state.cart_length) - 1 
        }))
      )
  }
  // this.setState(prevState => ({
  //   				cart_length: [...this.state.cart_length, data.cart_items.length]
  //   			}))



  


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
    console.log(this.state.cart_length)
    return (
      <React.Fragment>
        {/* {this.state.cart_length !== this.state.cart.length ? this.setLent() : null} */}
        <div className="Header">
          <Header token={this.state.token}
            cart={this.state.cart}
            setLength={this.state.cart_length}
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
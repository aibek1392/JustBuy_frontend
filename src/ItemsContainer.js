import React from 'react'
import ItemList from './ItemList'
import CartList from './CartList'

export default class ItemsContainer extends React.Component {

  state = {
    items: [],
    showItems: [],
    display: null
  }

  componentDidMount(){
    fetch("http://localhost:3001/items")
    .then(res => res.json())
    .then(res_obj =>
      this.setState({
        items: res_obj.data,
        showItems: res_obj.data
      })
    )
  }

	filterItems = (event) => {
    const filter_type = event.target.value

    if (filter_type === "All") {
      this.setState({
        showItems: this.state.items
      })
    } else {
  		this.setState({
  		  showItems: this.state.items.filter(item => item.attributes.category === filter_type)
  		})
    }

	}

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render(){

    const showCart =
      <CartList
        user={ this.props.user }
        cart={ this.props.cart }
        removeFromCart={ this.props.removeFromCart }
      />

    const showItems =
      <ItemList
        filterItems={ this.filterItems }
        items={ this.state.showItems }
        addToCart={this.props.addToCart}
      />
    return(
      <div>
        {(this.props.display === "Cart") ? (showCart) : (showItems) }
      </div>
    )
  }

}
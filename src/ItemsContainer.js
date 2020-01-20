import React from 'react'
import ItemList from './ItemList'
import CartList from './CartList'

export default class ItemsContainer extends React.Component {

  state = {
    items: [],
    showItems: [],
    // display: null,
    showFilteredItems: "All"
  }

  componentDidMount() {
    fetch("http://localhost:3001/items")
      .then(res => res.json())
      .then(res_obj =>
        this.setState({
          items: res_obj.data,
          showItems: res_obj.data
        })
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

//   whichItemsToRender = () => {
//     if (this.state.showFilteredEvents === "All") {
//         return this.state.events
//     } else {
//         return this.state.events.filter(event => event.category === this.state.showFilteredEvents)
//     }

// }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {

    
    // const showCart =
    //   <CartList
    //     user={this.props.user}
    //     cart={this.props.cart}
    //     removeFromCart={this.props.removeFromCart}
    //   />

    // const showItems =
    //   <ItemList
    //     terms={this.state.showFilteredItems}
    //     filterItems={this.filterItems}
    //     items={this.whichItemsToRender()}
    //     itemsForFilter={this.state.showItems}
    //     addToCart={this.props.addToCart}
    //   />
    return (
      <div>
         <ItemList
        terms={this.state.showFilteredItems}
        filterItems={this.filterItems}
        items={this.whichItemsToRender()}
        itemsForFilter={this.state.showItems}
        addToCart={this.props.addToCart}
      />
        {/* {(this.props.display === "Cart") ? (showCart) : (showItems)} */}
      </div>
    )
  }

}
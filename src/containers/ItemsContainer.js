import React from 'react'
import ItemList from './ItemList'

export default class ItemsContainer extends React.Component {

  state = {
    items: [],
    showItems: [],
    showFilteredItems: "All"
  }

  componentDidMount() {
    fetch("http://localhost:3001/items")
      .then(res => res.json())
      .then(res_obj => {
        const slicedData = res_obj.sort((a, b) => b.id - a.id);
        this.setState({
          items: slicedData,
          showItems: slicedData
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
      return this.state.items.filter(item => item.category === this.state.showFilteredItems)
    }
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {
    return (
      <div>
        <ItemList
          terms={this.state.showFilteredItems}
          filterItems={this.filterItems}
          items={this.whichItemsToRender()}
          itemsForFilter={this.state.showItems}
          addToCart={this.props.addToCart}
          showDetails={this.props.showDetails}
        />
      </div>
    )
  }

}
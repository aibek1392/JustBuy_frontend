import React from 'react'
import ItemCard from './ItemCard'

import './ItemList.css'

export default class ItemList extends React.Component {

	state = {
		searchTerm: ''
	}

	handleChange = (event) => {
		this.setState({
			searchTerm: event.target.value
		})
  	}

	onChangeFunctionsFilter = (event) => {
		this.props.filterItems(event)
	}

	render(){

    	const searchedItem = this.props.items.filter(item => item.attributes.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))

		const distributeItems = searchedItem.map(item =>
			<ItemCard
				key={item.id}
				item={item}
				addToCart={this.props.addToCart}
			/>
		)

		return(
			<>
				<div className="item_filters">
					<label>
			        	Search: <input value={this.state.searchTerm} onChange={this.handleChange} type="search"/>
			        </label>
			        <label>
			          <strong></strong>
			          <select onChange={ this.onChangeFunctionsFilter }>
			            <option value="All">All</option>
						<option value="Cars">Cars</option>
                        <option value="Bicycles">Bicycles</option>
			            <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
			            <option value="Shoes">Shoes</option>
			          </select>
			        </label>
				</div>
				<div className="item_list">
					{ distributeItems }
				</div>
			</>
		)
	}

}
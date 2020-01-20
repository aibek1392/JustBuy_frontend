import React from 'react'
import ItemCard from './pages/ItemCard'

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

	// onChangeFunctionsFilter = (event) => {
	// 	this.props.filterItems(event)
	// }

	render() {

		const searchedItem = this.props.items.filter(item => item.attributes.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
		const arrayOfCategories = []
		const filteredCategories = this.props.itemsForFilter.map(item => {
			if (!arrayOfCategories.includes(item.attributes.category)) {
				arrayOfCategories.push(item.attributes.category)
				return <option key={item.id}>{item.attributes.category}</option>
			}
		})

		const distributeItems = searchedItem.map(item =>
			<ItemCard
				key={item.id}
				item={item}
				addToCart={this.props.addToCart}
			/>
		)

		return (
			<>
				<div className="item_filters">
					<label>
						<strong>Search:</strong>	 <input value={this.state.searchTerm} onChange={this.handleChange} type="search" />
					</label>
					<label>
						<strong>Filter</strong>
						<select onChange={(event) => this.props.filterItems(event.target.value)}
							value={this.props.terms}>
							<option value="All">All</option>
							{filteredCategories}
						</select>
					</label>
				</div>
				<div className="item_list">
					{distributeItems}
				</div>
			</>
		)
	}

}

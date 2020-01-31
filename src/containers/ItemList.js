import React from 'react'
import ItemCard from '../pages/ItemCard'
import { Link } from 'react-router-dom'
import {  Button } from 'semantic-ui-react'

import '../styling/ItemList.css'

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
		console.log(this.props.items)
		const searchedItem = this.props.items.filter(item =>  	item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
		const arrayOfCategories = []
		const filteredCategories = this.props.itemsForFilter.map(item => { 
			if (!arrayOfCategories.includes(item.category)) {
				arrayOfCategories.push(item.category)
				return <option key={item.id}>{item.category}</option>
			}
		})

		const distributeItems = searchedItem.map(item =>
			<ItemCard
				key={item.id}
				item={item}
				addToCart={this.props.addToCart}
				showDetails={this.props.showDetails}
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
					<Link to="create_item">
						<Button
						style={{ fontSize: 9, marginLeft: "20px"}} 
							color='red'
							content='Create New Item'
							icon='add'

							labelPosition='left'
						/>
					</Link>
				</div>
				<div className="item_list">
					{distributeItems}
				</div>
			</>
		)
	}

}

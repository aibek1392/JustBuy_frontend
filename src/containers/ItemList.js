import React from 'react'
import ItemCard from '../pages/ItemCard'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
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

	render() {
		const searchedItem = this.props.items.filter(item => item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
		const arrayOfCategories = []
		const filteredCategories = this.props.itemsForFilter.map(item => {
			if (!arrayOfCategories.includes(item.category)) {
				arrayOfCategories.push(item.category)
				return <option key={item.id}>{item.category}</option>
			}
		})

		const distributeItems = searchedItem.map(item =>{
			return	<ItemCard
				key={item.id}
				item={item}
				addToCart={this.props.addToCart}
				showDetails={this.props.showDetails}
			/>
		})
		return (
			<>
				<div className="item_filters">
					<div >
						<Input size="mini" type="search" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search by name..." />
						<button className="ui mini red icon button"><i aria-hidden="true" className="search icon "></i></button>
					</div>
					<label >
						<strong>Filter</strong>
						<select style={{ height: "20px" }} onChange={(event) => this.props.filterItems(event.target.value)}
							value={this.props.terms}>
							<option value="All">All</option>
							{filteredCategories}
						</select>
					</label>
					<Link to="create_item">
						<Button
							size='tiny'
							style={{ marginLeft: "20px" }}
							color='red'
							content='Create New Item'
							icon='add'
							labelPosition='left'
						>
						</Button>
					</Link>
				</div>
				<div className="item_list">
					{distributeItems}
				</div>
			</>
		)
	}

}

import React from 'react'
import '../styling/ItemCard.css'
import { Link } from 'react-router-dom'

export default class ItemCard extends React.Component {

	state = {
		item_quantity: null
	}

	componentDidMount() {
		fetch(`http://localhost:3001/items/${this.props.item.id}`)
			.then(res => res.json())
			.then(res_obj => {
				this.setState({
					item_quantity: res_obj.quantity
				})
			}
			)
	}

	onClickFunctionsAdd = () => {
		this.props.addToCart(this.props.item)
	}




	render() {
		const item = this.props.item
		return (
			<div className="item_card">
				<h1>
					{item.name}
				</h1>
				<div className="item_card_img_frame" onClick={() => this.props.showDetails(this.props.item)}>
					<Link to='/detail'>
						<img src={item.img_url} alt="test_img" />
					</Link>
				</div>
				<div className="item_card_info">
					${item.price}
				</div>
				<button onClick={this.onClickFunctionsAdd}>Add To Cart</button>
			</div>
		)
	}

}
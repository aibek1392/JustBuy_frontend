import React from 'react'

import '../styling/ItemCard.css'

export default class ItemCard extends React.Component {

    onClickFunctionsAdd = () => {
        this.props.addToCart(this.props.item.id)
    }

    render(){

        const item = this.props.item.attributes

        return(
            <div className="item_card">
	            <h1>
					{ item.name }
				</h1>
	            <div className="item_card_img_frame">
	            <img  src={ item.img_url } alt="test_img"/>
	            </div>
				<div className="item_card_info">
	            ${ item.price }
	            <br />
	            { item.category }
	            <br />
	            { item.quantity } Left
	            <br />
	            { item.description }
	            <br />
				</div>
	            <button onClick={this.onClickFunctionsAdd }>Add To Cart</button>
            </div>
        )
    }

}
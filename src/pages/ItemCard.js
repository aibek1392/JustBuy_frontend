import React from 'react'
import axios from 'axios'
import '../styling/ItemCard.css'
import { Link } from 'react-router-dom'
export default class ItemCard extends React.Component {


	state = {
		item_quantity: null
	}


	componentDidMount(){
        fetch(`http://localhost:3001/items/${this.props.item.id}`)
        .then(res => res.json())
        .then(res_obj => {
			// console.log(res_obj)
            this.setState({
                item_quantity: res_obj.quantity
			})
		}
        )
       
    }

    onClickFunctionsAdd = () => {
		this.props.addToCart(this.props.item)
	// 	axios.patch(`http://localhost:3001/items/${this.props.item.id}`, {
	// 		cart_quantity: this.state.item_quantity -= 1
		
	// })
    }




    render(){
// console.log(this.props.item)
        const item = this.props.item

        return(
            <div className="item_card">
	            <h1>
					{ item.name }
				</h1>
	            <div className="item_card_img_frame" onClick={()=> this.props.showDetails(this.props.item)}>
				<Link to='/detail'> 
	            <img  src={ item.img_url } alt="test_img"/>
				</Link>
	            </div>
				<div className="item_card_info">
	            ${ item.price }
	            {/* <br /> */}
	            {/* { item.category } */}
	            {/* { item.quantity } Left */}
	            {/* <br /> */}
	            {/* { item.description } */}
	            {/* <br /> */}
				</div>
	            <button onClick={this.onClickFunctionsAdd }>Add To Cart</button>
            </div>
        )
    }

}
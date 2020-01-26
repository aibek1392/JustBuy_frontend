import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import '../styling/Header.css'
import HomeIcon from './HomeIcon';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
export default class Header extends React.Component {

	state = {
		cart_length: false
	}

	setLength = () => {
		this.setState({
			cart_length: this.props.setLength
		})
	}
	

	onClickFunctionsLogOut = () => {
		this.props.logOut(this.props.token)
	}

	// componentDidMount(){

	// }




	// setQuant =() => {
	// 	fetch(`http://localhost:3001/users/${this.props.userId}`)
	// 		.then(r => r.json())
	// 		.then(data => {
	// 			// console.log(data)
	// 			this.props.setLength(data.cart_items.length)
	// 			// console.log(data.cart_items.)
	// 			this.setState(prevState => ({
	// 				cart_length:  data.cart_items.length
	// 			}))
	// 		})
	// }

	// componentDidUpdate(prevState, prevProps) {
	// 	if (this.cart_length !== this.state.cart_length) {
	// 		return true
	// 	}
	// }

	render() {
		console.log(this.state.lengthOfCart)
		// console.log(this.state.cart_length)
		// console.log("from header", this.state.cart_length[0].map(data => {
		// 	data.length
		// }))
		// const lengt = this.state.cart_length.find(data => {
		// 	return <span>{data.length}</span>
		// })
		// console.log(this.state.cart_length)

		return ( 

			<React.Fragment>
				{/* {this.props.lengthOfCart > this.state.cart_length ? 
				
				this.setLength()
				: 
				null } */}
				{/* {!this.state.cart_length ? this.setLength() : null} */}
				
				{!!this.props.token ?
					<Link  exact to="/marketplace" >
						<div className="header_icon">
						<h1><span className="Just">J</span>ustBuy</h1>
						</div>
					</Link>
					:
					""
				}




				<div className="header_right">
					{!!this.props.token ?
						<div className="header_greeting">
							<h2 > Wellcome , {this.props.getUser}</h2>
						</div>
						:
						""
					}

					
					
					{!!this.props.token || !!this.state.setLength ? 
						<Link to='/mycart'>
							<button className="header_button" 
							onClick={this.onClickFunctionsCart}><AddShoppingCartIcon
							style={{ fontSize: 32, color: "green" }} /><span 
					style={{ color: "red", borderRadius: "10px" }}>{this.props.setLength }</span></button>
						</Link>
						:
						""
					}
					{!!this.props.token ?
						<Link to='/'>
							<button className="header_button" style={{ height: 42 }} onClick={this.onClickFunctionsLogOut}>Log Out</button>
						</Link>
						:
						""
					}
				</div>
			</React.Fragment>
		)
	}
}
import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import '../styling/Header.css'
import  HomeIcon  from './HomeIcon';

export default class Header extends React.Component {

	// onClickFunctionsCart = () => {
	// 	this.props.displayCart()
	// }

	// onClickFunctionsItems = () => {
	// 	this.props.displayItems()
	// }

	onClickFunctionsLogOut = () => {
		this.props.logOut(this.props.token)
	}

	// onClickFunctionsHome = () => {
	// 	this.props.displayLogin()
	// }

	render() {

		return (
			<>
					{!!this.props.token ?
						

							<Link exact to="/marketplace" >
								<HomeIcon  style={{ fontSize: 40 }}/>
							</Link>
						
						:
						""
					}
				<div className="header_right">
					{!!this.props.token ?
						<div className="header_greeting">
							<h2> Hello , {this.props.getUser}</h2>
						</div>
						:
						""
					}
					{!!this.props.token ?
						<Link to='/marketplace'><button className="header_button" onClick={this.onClickFunctionsItems}>Marketplace</button></Link>
						:
						""
					}
					{!!this.props.token ?
							<Link to='/mycart'>
						<button className="header_button" onClick={this.onClickFunctionsCart}>My Cart</button>
						</Link>	
						:
						""
					}
					{!!this.props.token ?
						<Link to='/'>
							<button className="header_button" onClick={this.onClickFunctionsLogOut}>Log Out</button>
						</Link>
						:
						""
					}
				</div>
			</>
		)
	}
}
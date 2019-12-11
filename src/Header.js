import React from 'react'
import { NavLink } from 'react-router-dom'

import './Header.css'

export default class Header extends React.Component {

onClickFunctionsCart = () => {
	this.props.displayCart()
}

onClickFunctionsItems = () => {
	this.props.displayItems()
}

onClickFunctionsLogOut = () => {
	this.props.logOut(this.props.token)
	this.props.displayLogin()
}

onClickFunctionsHome = () => {
	this.props.displayLogin()
}

	render(){
		
		return(
			<>
				<div>
					<NavLink exact to="/" onClick={this.onClickFunctionsHome }>Home</NavLink>
				</div>
				<div className="header_right">
					{ !!this.props.token ?
					<div className="header_greeting">
							<h2> Hello , { this.props.getUser }</h2>
					</div>
					:
						""
					}
					{ !!this.props.token ?
						<button className="header_button" onClick={ this.onClickFunctionsItems }>Marketplace</button>
					:
						""
					}
					{ !!this.props.token ?
						<button className="header_button" onClick={ this.onClickFunctionsCart }>My Cart</button>
					:
						""
					}
					{ !!this.props.token ?
						<button className="header_button" onClick={ this.onClickFunctionsLogOut }>Log Out</button>
					:
						""
					}
				</div>
			</>
		)
	}
}
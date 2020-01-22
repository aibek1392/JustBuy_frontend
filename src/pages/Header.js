import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import '../styling/Header.css'
import HomeIcon from './HomeIcon';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
export default class Header extends React.Component {

	state = {
		cart_length: []
	}

	onClickFunctionsLogOut = () => {
		this.props.logOut(this.props.token)
	}

	componentWillMount() {
		fetch(`http://localhost:3001/users/${this.props.userId}`)
			.then(r => r.json())
			.then(data => {
				this.setState(prevState => ({
					cart_length: data.cart_items.length
				}))
			})
	}

	componentDidUpdate(prevState, prevProps) {
		if (prevState.cart_length !== this.state.cart_length) {
			return this.state.cart_length
		}
	}

	render() {
		return (
			<React.Fragment>
				{!!this.props.token ?
					<Link exact to="/marketplace" >
						<HomeIcon style={{ fontSize: 20 }} />
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
					{!!this.props.token ?
						<Link to='/mycart'>
							<button className="header_button" onClick={this.onClickFunctionsCart}><AddShoppingCartIcon style={{ fontSize: 32, color: "green" }} /><span style={{ color: "red", borderRadius: "10px" }}>{this.state.cart_length}</span></button>
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
import React from 'react'
import { Link } from 'react-router-dom'
import '../styling/Header.css'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
export default class Header extends React.Component {

	state = {
		cart_length: localStorage.cart_length
	}

	setLength = () => {
		this.setState({
			cart_length: this.props.setLength
		})
	}

	onClickFunctionsLogOut = () => {
		this.props.logOut(this.props.token)
	}

	componentDidMount() {
		return fetch(`http://localhost:3001/users/${this.props.userId}`)
			.then(r => r.json())
			.then(data => {
				this.props.setLength(data.cart_items.length)
			})
	}

	setLength = (data) => {
		localStorage.cart_length = data
		this.setState({
			cart_length: data
		})
	}

	render() {
		return (
			<React.Fragment>
				{!!this.props.token ?
					<Link exact to="/marketplace" >
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
								style={{ background: '#ff0000',
								color: '#fff',
								border: 'none',
								padding: '3px 6px',
								borderRadius: '50%',
								cursor: 'pointer',
								float: 'right'}}>{this.props.cartLength}</span>
							</button>
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
import React from 'react'

import './SignUp.css'

export default class SignUp extends React.Component {

	state = {
		logIn: true,
		username: "",
		password: "",
		errors: []
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	onClickFunctionsSubmitSignUp = (event) => {
		event.preventDefault()
		    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(res_obj => {
      if (res_obj.errors) {
        this.setState({
          errors: res_obj.errors
        })
      } else {
		this.props.displayItems()
        this.props.setToken(res_obj)
      }
    })
	}

	render(){

		return(
			<div className="signup_wrapper">
				<h2>Sign Up</h2>
					<form onSubmit={ this.onClickFunctionsSubmitSignUp }>
						<label htmlFor='sign_up_username'>Username</label>
						<input id="sign_up_username"
						       type="text"
						       onChange={ this.onChange }
						       name="username"
						       value={ this.state.username } />
						<label htmlFor='sign_up_password'>Password</label>
						<input id="sign_up_password"
						       type="password"
						       onChange={ this.onChange }
						       name="password"
						       value={ this.state.password } />
						<input className="signup_button" type="submit" />
					</form>
			</div>
		)

	}

}
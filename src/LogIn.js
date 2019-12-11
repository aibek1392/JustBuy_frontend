import React from 'react'

import './Login.css'

export default class LogIn extends React.Component {

  state = {
    logIn: true,
    username: "",
    password: "",
    errors: []
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmitFunctions = (event) => {
    this.logInSubmitted(event)
    this.props.updateCart()
    this.props.displayItems()
  }

	onClickFunctionsSignUp = (event) => {
		this.props.displaySignUp(event)
	}

  logInSubmitted = (event) => {
    event.preventDefault()
    fetch("http://localhost:3001/login", {
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
        this.props.displayLogin()
        this.setState({
          errors: res_obj.errors
        })
      } else {
        this.props.setToken(res_obj)
        this.props.getUser(res_obj)
      }
    })
  }

  render(){
    return <>
      <ul>
        { this.state.errors.map(error => <li>{ error }</li>) }
      </ul>
      {
        this.state.logIn
        ?
        <div className="login_wrapper">
          <h2>Log In</h2>
          <form onSubmit={ this.onSubmitFunctions }>
            <label  htmlFor="log_in_username">Username</label>
            <input  id="log_in_username"
                    type="text"
                    onChange={ this.onChange }
                    name="username"
                    value={ this.state.username } />
            <label  htmlFor="log_in_password">Password</label>
            <input  id="log_in_password"
                    type="password"
                    onChange={ this.onChange }
                    name="password"
                    value={ this.state.password } />
            <input className="login_button" type="submit" />
          </form>
          <button className="login_button" onClick={ this.onClickFunctionsSignUp }>Sign Up</button>
        </div>
        :
			""
      }
    </>
  }
}
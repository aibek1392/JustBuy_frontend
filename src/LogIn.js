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
    // this.props.updateCart()
    // this.props.displayItems()
  }

	onClickFunctionsSignUp = (event) => {
    event.preventDefault()
    this.props.history.push('/signup')
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
      console.log(res_obj.errors)
      if (res_obj.errors) {
        this.props.history.push('/')
        this.setState({
          errors: res_obj.errors,
          username: "",
          password: ""

        })
      } else {
        this.props.setToken(res_obj)
        this.props.getUser(res_obj)
        this.props.history.push('/marketplace')
      }
    })
  }

  render(){
    return <div className="main_wrapper">
      <ul>
        { this.state.errors.map(error => <h2 style={{color:"red", textAlign: "center"}}><strong>{ error }</strong></h2>) }
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
                    placeholder="Enter your username"
                    onChange={ this.onChange }
                    name="username"
                    value={ this.state.username } />
            <label  htmlFor="log_in_password">Password</label>
            <input  id="log_in_password"
                    type="password"
                    placeholder="Enter your password"
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
    </div>
  }
}
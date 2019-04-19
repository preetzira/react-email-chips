import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:"",
      emails:[],
      error:null
    }
  }

  handleChange = e => {
    this.setState({
      value:e.target.value,
      error:null
    })
  }

  handleKeyDown = e => {
    if(['Enter','Tab',','].includes(e.key)){
      e.preventDefault();
      let email = this.state.value.trim();
      if (email && this.isValid(email)) {
        this.setState({
          emails:[...this.state.emails,email],
          value:"",
          error:null
        })
      }
    }
  }

  handleDelete = indexOfEmailToBeDeleted => {
    this.setState({
      emails : this.state.emails.filter((email,index) => index !== indexOfEmailToBeDeleted)
    })
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  isInList(email) {
    return this.state.emails.includes(email);
  }

  isValid(email) {
    var error = null;

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }
    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }
    if (error) {
      this.setState({ error });
      return false;
    }
    return true;
  }

  render() {
    return (
      <React.Fragment>
        <div className="w-50 mt-5 ml-auto mr-auto">
          {this.state.emails.map((email,index) => (
              <div key={index} className="custom-email-badge mr-2">
                {email}
                <button className="ml-2 custom-delete-badge" onClick={()=>this.handleDelete(index)}>&times;</button>
              </div>
            )
          )}
        </div>
        <input
          placeholder="Type or paste email addresses and press `Enter`"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className={'form-control br-4 w-50 ml-auto mr-auto mt-2' + (this.state.error && ' is-invalid')}
        />
        {this.state.error &&
        <p className={'w-50 ml-auto mr-auto' + (this.state.error && ' text-danger')}>{this.state.error}</p>}
      </React.Fragment>
    );
  }
}

export default App;

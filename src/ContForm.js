import React, { Component } from 'react';
import axios from 'axios';
import './ContForm.css';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      tel: '',
      message: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleTelChange = this.handleTelChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  handleSubmit(event) {
    event.preventDefault()
    const message = {
      name: this.state.name,
      email: this.state.email,
      tel: this.state.tel,
      message: this.state.message
    };

    let formData = new FormData()
    let config = {
      header: { 'Content-Type': 'multypart/form-data' }
    };
    for (let key in message) {
      formData.append(key, message[key])
    };

    axios.post('http://localhost:5000/', formData, config).then(res => {
      console.log(res.data);
      if (res.status === 200) {
        alert('Your message sended')
        this.setState({ name: '', email: '', tel: '', message: '' });
      }else{
        alert('Error, try later')
      }
    }).catch(error => console.log(error));
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handleTelChange(event) {
    this.setState({ tel: event.target.value });
  }
  handleTextChange(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      <div className='div'>
        <h1>Contact us</h1>
        <form onSubmit={this.handleSubmit}>
          <input className='input' type='text' placeholder='Name' value={this.state.name} onChange={this.handleNameChange} />
          <input className='input' type="email" placeholder='E-mail' value={this.state.email} onChange={this.handleEmailChange} />
          <input className='input' type='text' placeholder='Phone number' value={this.state.tel} onChange={this.handleTelChange} />
          <textarea className='input' placeholder='Message' value={this.state.message} onChange={this.handleTextChange} />
          <button className='button' type='submit' >SEND</button>
        </form>
      </div>
    );
  };
}





export default ContactForm;

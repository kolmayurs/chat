import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

class CApp extends Component {
  constructor(props){
    super(props);
    this.state = {
            username: '',
            message: '',
            messages: []
        };
     this.socket = io('localhost:4000');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.user,
                message: this.state.message
            })
            this.setState({message: ''});

        }

  }
  componentWillMount(){
    let userName = prompt('Please Enter your name');
    if(userName === '' || userName === null || typeof userName === 'undefined'){
      this.setState({user: 'Guest' })
    }
    else{
      this.setState({user: userName })
    }
  }


  render() {
  
    const data = this.state.messages.map((items, i) => {
      return(<h5 key={'items'+i}>{items}</h5>)
    })
    return (
      <div className="App">
      <h4>Hello World</h4>
      {data}
        <div className='chat-input'>
          <input value={this.state.message} value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} type="text" placeholder="Enter Here.." />
          <button onClick={this.sendMessage}>Submit</button>
        </div>
      </div>
    );
  }
}

export default CApp;

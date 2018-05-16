import React from "react";
import io from "socket.io-client";
import './App.css';

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('https://socket-o-server.herokuapp.com/');

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
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }
    }
    componentWillMount(){
    let userName = prompt('Please Enter your name');
    if(userName === '' || userName === null || typeof userName === 'undefined'){
      this.setState({username: 'Guest' })
    }
    else{
      this.setState({username: userName })
    }
  }

    render(){
        const data = this.state.messages.map((items, i) => {
      return(<h5 key={'items'+i}>{items.author}: {items.message}</h5>)
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

export default App;
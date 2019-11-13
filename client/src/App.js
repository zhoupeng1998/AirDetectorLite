import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
//const axios = require('axios');

class App extends Component {
    state = {
        data: '',
    }

    constructor () {
        super()
    }

    componentDidMount () {
        console.log('1');
        this.setState({data: '2'})
        var _this = this;
        axios.get('http://127.0.0.1:8080/record').then((res) => {
            _this.setState({data: res.data.time[0]});
            _this.setState({time: res.data.time});
            _this.setState({temperature: res.data.temperature});
            _this.setState({humidity: res.data.humidity});

        }).catch(err => {
            _this.setState({data: 'ERROR'});
        });
    }

    render () {
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <p>
                    {this.state.data}
                </p>
              </header>
            </div>
          );
    }
}

export default App;

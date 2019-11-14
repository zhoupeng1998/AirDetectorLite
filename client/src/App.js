import React, {Component} from 'react';
import logo from './logo.svg';
/*import './App.css';*/
import axios from 'axios';
import {Line as LineChart} from 'react-chartjs-2';
//const axios = require('axios');

class App extends Component {
    state = {
        time: [],
        temperature: [],
        humidity: []
    }

    constructor () {
        super()
    }

    componentDidMount () {
        console.log('1');
        this.setState({data: '2'})
        var _this = this;
        axios.get('http://127.0.0.1:8080/record').then((res) => {
            _this.setState({time: res.data.time.reverse()});
            _this.setState({temperature: res.data.temperature.reverse()});
            _this.setState({humidity: res.data.humidity.reverse()});

        }).catch(err => {
            _this.setState({data: 'ERROR'});
        });
    }

    render () {
        var chart = {
            labels: this.state.time,
            datasets: [
                /*{
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                }*/
                //,
                {label: "Temperature", yAxisID: 'Temperature', data: this.state.temperature, borderColor: 'rgba(75,192,192,1)', fill:false},
                {label: "Humidity", yAxisID: 'Humidity', data: this.state.humidity, borderColor: 'rgba(255, 0, 0, 1)', fill:false}
                //*/
            ]
        }

        const options = {
            scales: {
                yAxes: [{
                  id: 'Temperature',
                  type: 'linear',
                  scaleLabel: {
                    labelString: 'Temperature (ºC)',
                    display: true,
                  },
                  position: 'left',
                },
                {
                  id: 'Humidity',
                  type: 'linear',
                  scaleLabel: {
                    labelString: 'Humidity (%)',
                    display: true,
                  },
                  position: 'right',
                }]
            }
        }
        return (
            <div className="App">
                <LineChart data={chart} options={options} width='1000' height='500' />
            </div>
          );
    }
}

export default App;

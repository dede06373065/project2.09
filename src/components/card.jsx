import React, { Component } from 'react'
import './weather.css'
import PropTypes from 'prop-types'
export default class Card extends Component {
    static propTypes = {
        forecastWeatherTemp: PropTypes.array.isRequired,
        forecastWeatherMain: PropTypes.array.isRequired,
    }
    weatherIcon = (props) => {
        switch (props) {
            case "Clear":
                return "🌞";
            case "Clouds":
                return "☁️";
            case "Drizzle":
                return "☔️";
            case "Rain":
                return "☔️";
            case "Snow":
                return "❄️";
            case "Fog":
                return "🌁";
            case "Thunderstorm":
                return "⛈️";
            default:
                return "...";
        }
    }
    // List(){
    //     let htmlStr=''
    //     for(let i=0;i<5;i++){
    //         htmlStr+=`<li className="card">
    //         <h4>${week[i+1]}</h4>
    //         <h3>${this.weatherIcon(weatherMain[i])}</h3>
    //         <h3>${forecastWeatherTemp[i]}℃</h3>
    //         <p>${forecastWeatherMain[i]}</p>
    //         </li>`
    //     }
    //     return document.getElementById('row').innerHTML=htmlStr

    // }
   
    render() {
        const { forecastWeatherTemp, forecastWeatherMain } = this.props
        const weatherMain=forecastWeatherMain.map((i)=>{
            return i.toString();
        })
        const myDate = new Date()
        const week = []
        for (let j = 0; j < 6; j++) {
            var milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24 * j;
            var newMyDate = new Date(milliseconds);
            week[j] = newMyDate.toLocaleDateString([], { weekday: 'long' })

        }

        return (
            <ul className="row" >
                {/* {document.getElementById("row").innerHTML=getList()} */}
               {/* <List /> */}
                
                <li className="card">
                    <h4>{week[1]}</h4>
                    <h3>{this.weatherIcon(weatherMain[0])}</h3>
                    <h3>{forecastWeatherTemp[0]}℃</h3>
                    <p>{forecastWeatherMain[0]}</p>
                </li>
                <li className="card">
                    <h4>{week[2]}</h4>
                    <h3>{this.weatherIcon(weatherMain[1])}</h3>
                    <h3>{forecastWeatherTemp[1]}℃</h3>
                    <p>{forecastWeatherMain[1]}</p>
                </li>
                <li className="card">
                    <h4>{week[3]}</h4>
                    <h3>{this.weatherIcon(weatherMain[2])}</h3>
                    <h3>{forecastWeatherTemp[2]}℃</h3>
                    <p>{forecastWeatherMain[2]}</p>
                </li>
                <li className="card">
                    <h4>{week[4]}</h4>
                    <h3>{this.weatherIcon(weatherMain[3])}</h3>
                    <h3>{forecastWeatherTemp[3]}℃</h3>
                    <p>{forecastWeatherMain[3]}</p>
                </li>
                <li className="card">
                    <h4>{week[5]}</h4>
                    <h3>{this.weatherIcon(weatherMain[4])}</h3>
                    <h3>{forecastWeatherTemp[4]}℃</h3>
                    <p>{forecastWeatherMain[4]}</p>
                </li>
            </ul>

        )
    }
}
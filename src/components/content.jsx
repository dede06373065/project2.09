import React, { Component } from 'react'
import './weather.css'
import PropTypes from 'prop-types'
import axios from 'axios'
import Card from './card'
export default class Content extends Component {
    static propTypes = {
        searchName: PropTypes.string.isRequired
    }
    state = {
        currentWeather: {
            cityName: 'Adelaide',
            cityTemp: '',
            cityMain: '',
            cityHumidity: '',
            cityWind: '',
            cityLon: '',
            cityLat: ''
        },
        forecastWeatherTemp: [],
        forecastWeatherMain: []
    }

    UNSAFE_componentWillMount() {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.currentWeather.cityName}&units=metric&appid=2ece6441e298124f969938e7eb0d0302`
        axios.get(url).then(response => {
            const res = response.data
            this.setState({
                currentWeather: {
                    cityName: res.name,
                    cityMain: res.weather[0].main,
                    cityWind: res.wind.speed,
                    cityHumidity: res.main.humidity,
                    cityTemp: res.main.temp.toFixed(1),
                    cityLat: res.coord.lat,
                    cityLon: res.coord.lon

                },
            })

        }).catch((error) => {
            alert('error1')
        })
        const urlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=-34.93&lon=138.6&exclude=5&units=metric&appid=2ece6441e298124f969938e7eb0d0302`
        axios.get(urlForecast).then(response => {
            const result = response.data
            // console.log(result)
            const forecastWeatherTemp = []
            const forecastWeatherMain = []
            for (let i = 0; i < 5; i++) {
                forecastWeatherTemp[i] = [result.daily[i + 1].temp.day]
                forecastWeatherMain[i] = [result.daily[i + 1].weather[0].main]
            }
            this.setState({
                forecastWeatherTemp: forecastWeatherTemp,
                forecastWeatherMain: forecastWeatherMain

            })
        }).catch((error) => {
            alert('forecast error2')
        })
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        const { searchName } = newProps
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchName}&units=metric&appid=2ece6441e298124f969938e7eb0d0302`
        axios.get(url).then(response => {
            const res = response.data
            this.setState({
                currentWeather: {
                    cityName: res.name,
                    cityMain: res.weather[0].main,
                    cityWind: res.wind.speed,
                    cityHumidity: res.main.humidity,
                    cityTemp: res.main.temp.toFixed(1),
                    cityLat: res.coord.lat,
                    cityLon: res.coord.lon
                },
            })
        }).catch((error) => {
           console.log('City name does not exist')
        })


       
        const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchName}&units=metric&appid=2ece6441e298124f969938e7eb0d0302`
 
        axios.get(urlForecast).then(response => {
            const result = response.data
            console.log(result.city)
            if (result.list) {
                console.log(result.list[1].main.temp)
                const forecastWeatherTemp = []
                const forecastWeatherMain = []
                for (let i = 0; i < 5; i++) {
                    forecastWeatherTemp[i] = [result.list[i * 8 + 1].main.temp]
                    forecastWeatherMain[i] = [result.list[i * 8 + 1].weather[0].main]
                }
                this.setState({
                    forecastWeatherTemp: forecastWeatherTemp,
                    forecastWeatherMain: forecastWeatherMain

                })

            }

        }).catch((error) => {
            alert(error)
        })
    }
    render() {
        const city = this.props.searchName

        return (
            <div className="content">
                <div className="content__top">
                    <div className="content__top__details">
                        <h2>{this.state.currentWeather.cityTemp} ℃ </h2>
                        <h3>{this.state.currentWeather.cityMain}</h3>
                        <ul className="otherdetails">
                            <li>
                                <h4>Humidity</h4>{this.state.currentWeather.cityHumidity}
                                %
                    </li>
                            <li className="border">
                                <h4>Wind</h4>{this.state.currentWeather.cityWind}
                                m/s
                    </li>
                        </ul>
                    </div>
                    <div className="content__top__location">{city ? city.replace(/^\S/, s => s.toUpperCase()): this.state.currentWeather.cityName}</div>
                </div>
                <div className="content__ground">
                    <Card forecastWeatherTemp={this.state.forecastWeatherTemp} forecastWeatherMain={this.state.forecastWeatherMain}
                        lat={this.state.currentWeather.cityLat} lon={this.state.currentWeather.cityLon} />
                </div>
            </div>
        )
    }
}
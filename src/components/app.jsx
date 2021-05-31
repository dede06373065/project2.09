import React, { Component } from 'react'
import Nav from './nav'
import Content from './content'


export default class App extends Component {
    state={
        searchName:''
    }

    setSearchName=(cityName)=>{
        let name=cityName
        this.setState({searchName:name})
    }
    render() {
        return (
            <div>
                <Nav setSearchName={this.setSearchName} />
                <Content searchName={this.state.searchName}/>
            </div>
        )
    }
}
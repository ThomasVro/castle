import React, { Component} from 'react';
import './Home.css';

class HomePage extends Component {

    render() {
        return (
            <div>
                <div className="Head">
                    <img src = {require('./Images/home.png')} className="HomeImage"/>
                </div>
                <div className="Title">Welcome to Castle</div>
            </div>
        ); 
    }
}



export default HomePage;
import React, { Component } from "react";
import "./FakeAd.css";

const myDisplayInfo = [
    { gifUrl: '../gifs/AmericanJobs.gif' },
    { gifUrl: '../gifs/BadDay.gif' },
    { gifUrl: '../gifs/BurgerKing.gif' },
     { gifUrl: '../gifs/Canada.gif' },
     { gifUrl: '../gifs/ChickenBurger.gif' },
     { gifUrl: '../gifs/Leggins.gif' },
     { gifUrl: '../gifs/liveTheUnreal.gif' },
     { gifUrl: '../gifs/Macarrones.gif' },
     { gifUrl: '../gifs/SocialMedia.gif' },
     { gifUrl: '../gifs/SocialMedia2.gif' },
     { gifUrl: '../gifs/WhatToWatch.gif' } ];

class FakeAd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ranGifIndex: Math.floor(Math.random() * 9),
            timer: null,
        }
    }

    gifChanger = () => {
        this.timer = setInterval(() => this.setState({
            ranGifIndex: Math.floor(Math.random() * 9),
        }), 20000);
    }

    componentDidMount = () => {
        clearInterval(this.timer);
        this.gifChanger();
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
    }

    render() {
        let myFakeAd = null;
        let myRanIdx = this.state.ranGifIndex; 
        let myRanGif = myDisplayInfo[myRanIdx];


        myFakeAd = (<div className="fakeAd">
                    <img className="iGif" src={myRanGif.gifUrl} alt="AdverGif"></img>
                </div> );


        return ( <div className="myCoupon">
            {myFakeAd}
        </div>);
    }
}

export default FakeAd;
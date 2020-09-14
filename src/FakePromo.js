import React, { Component } from "react";
import "./FakePromo.css";

const myDisplayInfo = [
    { imageUrl: '../images/hotCakesProm.jpg',
     message: 'all the HotCakes' },
    { imageUrl: '../images/OmelettePromo.jpg',
     message: 'all the Omelettes' },
    { imageUrl: '../images/SaladPromo.jpeg',
     message: 'all the Salads' },
     { imageUrl: '../images/Bakery.jpg',
     message: 'all the Bakery' },
     { imageUrl: '../images/friedEggs.jpg',
     message: 'all the Breakfasts' },
     { imageUrl: '../images/GlutenFree.jpg',
     message: 'Gluten Free Meals' },
     { imageUrl: '../images/italianFood.jpeg',
     message: 'Italian Food' },
     { imageUrl: '../images/Pizza.jpg',
     message: 'all the Pizzas' },
     { imageUrl: '../images/Tacos.jpg',
     message: 'all the Tacos' },
     { imageUrl: '../images/Tostadas.jpg',
     message: 'all the Tostadas' } ];

class FakePromo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ranImageIndex: Math.floor(Math.random() * 9),
            timer: null,
        }
    }

    imageChanger = () => {
        this.timer = setInterval(() => this.setState({
            ranImageIndex: Math.floor(Math.random() * 9),
        }), 9000);
    }

    componentDidMount = () => {
        this.imageChanger();
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
    }

    render() {
        let myCoupon = null;
        let myRanIdx = this.state.ranImageIndex; 
        let myRanImage = myDisplayInfo[myRanIdx];


            myCoupon = (<div className="coupon">
                <div className="container">
                    <h5>Fake Food Company</h5>
                 </div>
                <img className="iCoupon" src={myRanImage.imageUrl} alt="Coupon"></img>
                <div className="container blanco">
                    <h4><b>15% OFF YOUR PURCHASE</b></h4> 
                    <p> Apply for {myRanImage.message}.
                    Valid only in restaurants in Monterrey and Metropolitan Area.
                    </p>
                </div>
                    <div className="container">
                        <p>Use Promo Code: <span className="promo">{`BOH${Math.floor(Math.random() * 9999)}`}</span></p>
                        <p className="expire">Expires: Jan 03, 2021</p>
                    </div> 
                </div> );


        return ( <div className="myCoupon">
            {myCoupon}
        </div>);
    }
}

export default FakePromo;
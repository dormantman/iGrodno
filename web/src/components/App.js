import React, {Component} from "react";
import ReactDOM from "react-dom";
import Main from "./Main.js";
import Header from "./objects/Header";
import Content from "./objects/Content";
import Footer from "./objects/Footer";
import Games from "./Games";
import Game from "./Game";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let pathname = window.location.pathname;

        if (pathname === '/') {
            return (
                <div>
                    <Header/>
                    <Content body={<Main/>}/>
                    <Footer/>
                </div>
            );

        } else if (pathname === '/games/') {
            return (
                <div>
                    <Header/>
                    <Content body={<Games/>}/>
                    <Footer/>
                </div>
            );

        } else if (pathname.match(/^\/game\/(\d+)/)) {
            return (
                <div>
                    <Header/>
                    <Content body={<Game/>}/>
                    <Footer/>
                </div>
            );

        } else {
            return (
                <div>
                    <Header/>
                    <Content body={
                        <p>Okay</p>
                    }/>
                    <Footer/>
                </div>
            );
        }
    }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App/>, wrapper) : null;
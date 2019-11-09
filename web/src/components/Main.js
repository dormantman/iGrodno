import React, {Component} from "react";
import Loader from "./objects/Loader";


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <div className={"main-logo"}>
                    <div className={"container"}>
                        <div className={"content"}>
                            <h1 className={"title"}>iGrodno</h1>
                            <p className={"description"}>Портал посвящённый видеоиграм</p>
                            <div className={"refer"}>
                                <div className={"primary-button"}>
                                    <a className={"button"} href={"/games/"}>Поиск игр</a>
                                </div>
                                <div className={"pre-primary-button"}>
                                    <a className={"button"} href={"/news/"}>Перейти к новостям
                                        <svg height="12" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 4.53657 8.69699"
                                             className="css-b7q1rs">
                                            <path d="
                            M.18254,8.697a.18149.18149,0,0,1-.12886-.31034L4.09723,4.34126.05369.29954a.18149.18149,
                            0,0,1,.2559-.2559L4.4838,4.21785a.18149.18149,0,0,1,0,.2559L.30958,8.648A.18149.18149,
                            0,0,1,.18254,8.697Z
                          " fill="currentColor">
                                            </path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    height: "250px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    Okay, it's games!
                    <Loader/>
                </div>
            </div>
        )
    }
}

export default Main;
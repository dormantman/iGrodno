import React, {Component} from "react";
import Games from "./Games";
import ReactHtmlParser from "react-html-parser";
import Carousel from "./objects/Carousel";

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loaded: false,
            next: false,
            loadingNextPage: false,
        };
    }

    static formatDate(date_str) {
        let date = new Date(date_str);
        return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    }

    static formatPlatform(platform) {
        if (platform === 'PC') {
            return 'pc'

        } else if (platform === 'PS3') {
            return 'ps3'

        } else if (platform === 'PS4') {
            return 'ps4'

        } else if (platform === 'Xbox 360') {
            return 'xbox360'

        } else if (platform === 'Xbox One') {
            return 'xboxone'
        }
    }

    static formatScore(score) {
        return Games.formatScore(score);
    }

    render() {
        const game = data.game;
        return <div>
            <div className="body-container" style={{
                backgroundColor: "#ffffff",
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.85), " +
                    "rgba(0, 0, 0, 0.85)), url(" + game.wallpaper + ")",
                backgroundPosition: "center", backgroundSize: "cover"
            }}>
                <div className="entry">
                    <div className="top">
                        <div className="title">{game.name}</div>
                    </div>
                    <div className="game">
                        <div className="top">
                            <div className="logo">
                                {
                                    game.logo ?
                                        <img className="image" src={game.logo} alt={game.name}/> :
                                        <div className="image no-image" style={{
                                            background: "linear-gradient(" +
                                                "70deg, #414042, #58595B)",
                                            textAlign: "center",
                                            marginTop: 'auto',
                                            paddingRight: 20,
                                            paddingLeft: 20,
                                            paddingTop: 30,
                                            fontSize: '0.9em',
                                        }}>
                                            {game.name}
                                        </div>
                                }
                            </div>
                            <div className="info">
                                <div className="container">
                                    <div className="left">
                                        <div className="platforms">
                                            {
                                                game.platforms.map((platform, index) => (
                                                    <a href={
                                                        "/games/?platforms=" + platform.short
                                                    } key={index} className={
                                                        Game.formatPlatform(platform.name)
                                                    }>{platform.name}</a>
                                                ))
                                            }
                                        </div>
                                        <div className="genres">
                                            <div className="label">
                                                Жанры
                                            </div>
                                            {
                                                game.genres.map((genre, index) => (
                                                    <a href={
                                                        "/games/?genres=" + genre.short
                                                    } key={index} className="genre"
                                                    >{genre.name}</a>
                                                ))
                                            }
                                        </div>
                                        <div className="date">
                                            <div className="label">
                                                Дата выхода
                                            </div>
                                            <div className="value">
                                                {
                                                    Game.formatDate(game.release_date)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right">
                                        {/*<div className="description">*/}
                                        {/*    {ReactHtmlParser(game.description)}*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        {ReactHtmlParser(game.description)}
                    </div>
                </div>
            </div>
            <div className="body-container">
                <div className="entry">
                    <div className="screenshots">
                        <Carousel images={game.screenshots}/>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Game;
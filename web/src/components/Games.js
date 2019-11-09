import React, {Component} from "react";
import Loader from "./objects/Loader";
import ReactHtmlParser from 'react-html-parser';
import queryString from 'query-string'

class Games extends Component {
    constructor(props) {
        super(props);

        const values = queryString.parse(window.location.search);

        this.state = {
            data: [],
            loaded: false,
            next: false,
            loadingNextPage: false,
            params: {
                platforms: values['platforms'],
                genres: values['genres'],
                games: values['games'],
            },
        };

        this.loadNextPage = this.loadNextPage.bind(this);
    }

    componentDidMount() {
        fetch("../api/games/?" + queryString.stringify(this.state.params))
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({
                data: data, loaded: true, next: data.next,
            }));
    }

    loadNextPage() {
        this.setState({loadingNextPage: true});
        fetch(this.state.data.next)
            .then(response => {
                return response.json();
            })
            .then(data => {
                data.results = this.state.data.results.concat(data.results);
                this.setState({
                    data: data, loaded: true, next: data.next, loadingNextPage: false
                })
            });
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
        const deg = Math.random() * 360;
        let colors = [
            'rgba(255, 153, 102, 0.7)',
            'rgba(255, 94, 98, 0.7)'
        ];

        if (score >= 9.5) {
            colors = [
                'rgba(127, 0, 255, 0.7)',
                'rgba(225, 0, 255, 0.7)'
            ];
        } else if (score >= 8.5) {
            colors = [
                'rgba(109, 16, 126, 0.7)',
                'rgba(240, 51, 88, 0.7)'
            ];
        } else if (score >= 7.5) {
            colors = [
                'rgba(206, 159, 252, 0.7)',
                'rgba(115, 103, 240, 0.7)'
            ];
        } else if (score >= 6.5) {
            colors = [
                'rgba(4, 206, 155, 0.7)',
                'rgba(100, 228, 8, 0.7)'
            ];
        } else if (score >= 5.5) {
            colors = [
                'rgba(255, 148, 21, 0.7)',
                'rgba(255, 199, 9, 0.7)'
            ];
        } else if (score >= 4.5) {
            colors = [
                'rgba(246, 211, 101, 0.7)',
                'rgba(253, 160, 133, 0.7)'
            ];
        }
        return 'linear-gradient(' + deg + 'deg, ' + colors[0] + ', ' + colors[1] + ')'
    }

    static formatPageTitle() {
        let title = 'Топ ' + data.games_type_end + ' игр';
        if (data.platform) title += ' на ' + data.platform;
        if (data.genre) return title + ' - ' + data.genre;
        return title
    }

    render() {
        const {data, loaded} = this.state;
        if (loaded) {
            return <div className="body-container">
                <div className="entry">
                    <div className="top">
                        <div className="title">{Games.formatPageTitle()}</div>
                    </div>
                    {
                        data.results.map(obj => (
                            <div className="game-container" key={obj.id}>
                                <div className="description-container">
                                    <a href={'/game/' + obj.id + '/'}>
                                        <h3 className="title">
                                            {obj.name}
                                        </h3>
                                    </a>
                                    <div className="description">
                                        {ReactHtmlParser(obj.description)}
                                    </div>
                                </div>
                                <div className="game">
                                    <div className="card" style={{
                                        backgroundImage: "linear-gradient(" +
                                            "rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.80)" +
                                            "), url(" + (obj.wallpaper ? obj.wallpaper : '/media/blurred.jpg') + ")"
                                    }}>
                                        <div className="entry">
                                            <div className="logo">
                                                {
                                                    <a href={'/game/' + obj.id + '/'}>
                                                        {
                                                            obj.logo ?
                                                                <img className="image" src={obj.logo} alt={obj.name}/> :
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
                                                                    {obj.name}
                                                                </div>
                                                        }
                                                    </a>
                                                }
                                            </div>
                                            <div className="genres">
                                                {
                                                    obj.genres.map((genre, index) => (
                                                        <a href={
                                                            "?genres=" + genre.short
                                                        } key={index} className="genre"
                                                        >{genre.name}</a>
                                                    ))
                                                }
                                            </div>
                                            <div className="platforms">
                                                {
                                                    obj.platforms.map((platform, index) => (
                                                        <a href={
                                                            "?platforms=" + platform.short
                                                        } key={index} className={
                                                            Games.formatPlatform(platform.name)
                                                        }>{platform.name}</a>
                                                    ))
                                                }
                                            </div>
                                            <div className="score" style={
                                                {
                                                    background: Games.formatScore(obj.average_score),
                                                    height: 32 + obj.average_score,
                                                    width: 32 + obj.average_score,
                                                }
                                            }>
                                                <p className="number">
                                                    {Number((obj.average_score).toFixed(2))}
                                                </p>
                                            </div>
                                            <div className="date">
                                                {
                                                    Games.formatDate(obj.release_date)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="footer-buttons">
                        {
                            this.state.data.next ?
                                <div className="next-button">
                                    <a className="button" onClick={this.loadNextPage}>{
                                        this.state.loadingNextPage ? <Loader width={40} height={40}/> : 'Показать ещё'
                                    }</a>
                                </div> : null
                        }
                    </div>
                </div>
            </div>
        }
        return <div className="body-container">
            <div className="entry">
                <div style={{
                    position: "absolute", margin: "auto",
                    top: 0, right: 0, bottom: 0, left: 0,
                    width: "80px", height: "80px"
                }}><Loader/></div>
                <div style={{
                    height: '100vh',
                }}><img alt=""/></div>
            </div>
        </div>;
    }
}

export default Games;
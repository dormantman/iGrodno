import React, {Component} from "react";
import PropTypes from "prop-types";
import Loader from "./objects/Loader";

class DataProvider extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired
    };
    state = {
        data: [],
        loaded: false,
        placeholder: "Loading..."
    };

    componentDidMount() {
        fetch(this.props.endpoint)
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({
                data: data.results, loaded: true
            }));
    }

    render() {
        const {data, loaded} = this.state;
        return loaded ? this.props.render(data) : <div>
            <p style={{
                position: "absolute", margin: "auto",
                top: 0, right: 0, bottom: 0, left: 0,
                width: "80px", height: "80px"
            }}><Loader/></p>
            <p style={{
                height: '100vh',
            }}></p>
        </div>;
    }
}

export default DataProvider;
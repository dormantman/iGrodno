import React from "react";

const Loader = ({width, height}) => (
    <div className="pure-loader">
        <img src="/static/img/loader.svg" width={width} height={height} alt="loader"/>
    </div>
);

export default Loader;
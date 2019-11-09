import React from "react";
import PropTypes from "prop-types";

const Table = ({data}) =>
    !data.length ? (
        <div style={{padding: "40px 40px"}}>
            <p> style={{padding: 15}} Nothing to show</p>
        </div>
    ) : (
        <div style={{padding: "40px 40px"}}>
            <h2 style={{padding: 15}} className="subtitle">
                Showing <strong>{data.length} items</strong>
            </h2>
            <div>
                {
                    data.map(obj => (
                        <div style={{paddingBottom: 25, display: "flex"}} key={obj.id}>
                            <div className={"name"}>{obj.name}</div>
                            <div style={{paddingLeft: 20}} className={"date"}>{obj.release_date}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );

Table.propTypes = {
    data: PropTypes.array.isRequired
};

export default Table;
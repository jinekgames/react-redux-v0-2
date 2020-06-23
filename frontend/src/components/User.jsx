import React from "react";

export default function User(props) {
    return (
        <div className="jumbotron jumbotron-fluid" style={{backgroundColor: "white", padding: "10px"}}>
            <div className="container">
                <h1 className="display-4">{props.name}</h1>
                <p className="lead">Email: {props.email}</p>
            </div>
        </div>
    );
}
import React from "react";

export default function User(props) {
    return (
        <div className="jumbotron jumbotron-fluid" style={{backgroundColor: "white", padding: "10px"}}>
            <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                <img src={props.img} height="300px" style={{ paddingRight: "20px" }}/>
                <div>
                    <h1 className="display-4">{props.name}</h1>
                    <p className="lead">Email: {props.email}</p>
                    <p className="lead">{ props.bio }</p>
                </div>
            </div>
        </div>
    );
}
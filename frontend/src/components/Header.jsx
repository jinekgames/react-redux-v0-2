import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const logosize = "100px";

export default function Header(props) {

    return (
        <div className="media" style={{padding: "15px 50px 0 0"}}>
            <Link to="/"><img src="https://sun9-63.userapi.com/c855536/v855536932/1d86e2/FhXxqP_QFY0.jpg" alt="logo" height={logosize} width={logosize} className="mr-3" /></Link>
            <div className="media-body">
                <h1 className="mt-0" >Memes</h1>
                Our site is only bout memes
            </div>
            <ul className={'nav flex-column'}>
                {
                    props.pages.map((page, i) => {
                        return (
                            <li className="nav-item" key={i}>
                                <Link to={page.path}>{page.name}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}

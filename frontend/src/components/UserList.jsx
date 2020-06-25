import React from 'react';
import { Link } from "react-router-dom"

export default function UserList(props) {
    return (
        <div>
            <h3>Список пользователей сайта:</h3>
            { props.isLoading && 
                <div className="loading">
                    <div className="spinner-grow text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            <ul>
                {
                    props.users.map(user => {
                        return (
                            <li key={user.userId} style={{listStyleType: "none"}}>
                                <div className="card mb-3" style={{maxWidth: "850px"}}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={user.img} className="card-img" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{user.name}</h5>
                                                <p className="card-text">{user.email}</p>
                                                <Link to={"/users/" + user.userId}>Перейти к пользователю </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}
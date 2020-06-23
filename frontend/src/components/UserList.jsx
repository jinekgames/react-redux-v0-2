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
                            <li key={user.userId}>
                                <p>{user.name}</p>
                                <Link to={"/users/" + user.userId}>Перейти к пользователю </Link>
                                <div>
                                    <span>Id: {user.userId}<br/></span>
                                    <span>Email: {user.email}<br/></span><br/>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}
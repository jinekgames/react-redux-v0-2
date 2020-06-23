import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import UserList from "./UserList";
import User from "./User";

export default class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
        }
    }

    async fetchUsers() {
        this.setState({
            isLoading: true,
        });

        try {
            //console.log("start respone");
            const response = await axios.get('http://localhost:3000/users');//https://jsonplaceholder.typicode.com/users
            this.setState({
                users: response.data.users,
            });
            //console.log("======\ngot users")
        } catch (e) {
            //console.log('error', e);

        } finally {
            //console.log(this.state.users);
            this.setState({
                isLoading: false,
            });
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/users" exact render={ () => {
                        document.title = "Пользователи";
                        return (
                            <UserList {...this.state} />
                        );
                    }} />
                    <Route path="/users/:userId" exact render={ (props) => {
                        //console.log(props.match.params.userId);
                        const selectedUser = this.state.users.find(user => user.userId == props.match.params.userId);
                        if (selectedUser) {
                            document.title = selectedUser.name;
                            //console.log(selectedUser);
                            return ( <User {...selectedUser} /> );
                        }
                        else {
                            return <Redirect  to={"/notfound"}/>;
                        }
                    }} />
                </Switch>
            </Router>
        )
    }
}
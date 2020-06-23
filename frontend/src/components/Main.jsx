import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import Login from "./Login";
import UsersContainer from "./UsersContainer";
import NotFound from "./NotFound";
import Contacts from "./Contacts";
import Registration from "./Registration";
import MyPage from "./MyPage";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            activePageId: 0,
            pages: [
                { pageId: 0, name: 'Статьи', path: "/" },
                { pageId: 1, name: 'Пользователи', path: "/users" },
                { pageId: 2, name: 'Контакты', path: "/contacts" },
            ],
        };
        this.setPage = this.setPage.bind(this);

        let cookieSeen = "";
        let cookie = document.cookie.split("; ");
        for (let i in cookie) {
            let oneCookie = cookie[i].split("=");
            if (oneCookie[0] == "cookieSeen")
            {
                cookieSeen = oneCookie[1];
                break;
            }
        }
        if (!cookieSeen) {
            alert("На нашем сайте используются Cookie");
            document.cookie = "cookieSeen=true";
        }
    }

    setPage(pageId) {
        this.setState({
            activePageId: pageId,
        });
    }

    render() {
        return (
            <Router>
                <div className={"container"}>
                    <Header
                        pages={this.state.pages}
                        setPage={this.setPage}
                    />
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{flex: "5"}}>
                            <Switch>
                                <Route path={this.state.pages[0].path} exact render={ () => {
                                    document.title = this.state.pages[0].name;
                                    return ( <Content /> );
                                }} />
                                <Route path={this.state.pages[1].path} exact render={ () => {
                                    document.title = this.state.pages[1].name;
                                    return ( <UsersContainer /> );
                                }} />
                                <Route path={this.state.pages[2].path} exact render={ () => {
                                    document.title = this.state.pages[2].name;
                                    return ( <Contacts /> );
                                }} />
                                <Route path={"/reg" } exact render={ () => {
                                    document.title = 'Регистрация';
                                    return ( <Registration /> );
                                }} />
                                <Route path={"/mypage" } exact render={ () => {
                                    document.title = 'Моя страница';
                                    return ( <MyPage /> );
                                }} />
                                <Route path={"*"} render={ () => {
                                    document.title = "Страница не найдена";
                                    return ( <NotFound /> );
                                }} />
                            </Switch>
                        </div>
                        <Login />
                    </div>
                </div>
            </Router>
        )
    }
}
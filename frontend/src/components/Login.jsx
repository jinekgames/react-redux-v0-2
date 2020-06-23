import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import userActionsCreators from "../actions/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onInputChageLog = this.onInputChageLog.bind(this);
        this.onInputChagePas = this.onInputChagePas.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.LoginPasswordAuth = this.LoginPasswordAuth.bind(this);

        
        if (!this.props.user.isLoggedIn) {
            let token = "";
            let cookie = document.cookie.split("; ");
            //console.log(cookie);
            for (let i in cookie) {
                let oneCookie = cookie[i].split("=");
                if (oneCookie[0] == "token")
                {
                    token = oneCookie[1];
                    break;
                }
            }
            if (token) {
                //console.log("tryed to log in");
                this.onLogin(token);
            }
        }
    }

    onInputChageLog(e) {
        this.setState({
            userLogin: e.target.value,
        });
    }
    onInputChagePas(e) {
        //console.log(e.target.value);
        this.setState({
            userPassword: e.target.value,
        });
    }

    async LoginPasswordAuth(login, password) {
        //console.log("=============\nlogin start");
        let params = {
            email: login,
            password: password,
        };
        //console.log(params);
        let res;
        try {
            res = await axios.post("http://localhost:3000/login", params);
        } catch (e)
        {
            alert('Пароль либо почта введены неверно');
            console.log(e);
        }
        //console.log("=========\nполученный с сервера ответ на токен", res.data);
        this.props.actions.userLoggedIn(res.data.token);
    }

    async onLogin(tokenParam = "") {
        //console.log(tokenParam);
        
        if (tokenParam) {
            try {
                const bearer = "Bearer " + tokenParam;
                let params = {
                    headers: {
                        Authorization: bearer,
                    },
                };
                //console.log(params);
                let res = await axios.get("http://localhost:3000/hello", params);
                this.props.actions.userGetData({
                    name: res.data.name,
                    id: res.data.userId,
                });
                this.props.actions.userLoggedIn(tokenParam);
            } catch (e) {
                console.log("cookie login", e);
                document.cookie = "token=";
            }
            return;
        }

        await this.LoginPasswordAuth(this.props.user.userLogin, this.props.user.userPassword);
        document.cookie = `token=${this.props.user.userToken}`;


        const bearer = "Bearer " + this.props.user.userToken;
        //console.log(bearer);
        let params = {
            headers: {
                Authorization: bearer,
            },
        };
        //console.log(params);
        let res = await axios.get("http://localhost:3000/hello", params);
        this.props.actions.userGetData({
            name: res.data.name,
            id: res.data.userId,
        });
        //console.log("=========\nполученный с сервера ответ на получение данных пользователя", res.data);
    }

    onLogout() {
        this.props.actions.userLoggedOut();
    }

    async deleteUser(token = this.state.token) {
        const bearer = "Bearer " + token;
        const params = {
            headers: {
                Authorization: bearer,
            },
        };
        //console.log(params.headers);
        
        let res = await axios.get("http://localhost:3000/delete", params);
        //console.log("try to delete:", res);
        this.onLogout();
    }

   render() {
        return (
            <div className={'login'} style={{flex: "1", marginTop: "10px"}}>
                {
                    (this.props.user.isLoggedIn) ?
                        <div className={'form'} style={{display: "flex", flexDirection: "column"}}>
                            <Link className={"badge badge-success"} to={"mypage"} style={{fontSize: "25px", marginTop: "7px"}}>{this.props.user.userName}</Link>
                            <button className="btn btn-outline-danger" onClick={() => this.deleteUser()} style={{marginTop: "7px"}}>удалить аккаунт</button>
                            <button className="btn btn-primary" onClick={() => this.onLogout()} style={{marginTop: "7px"}}>Выйти</button>
                        </div>
                        :
                        <div className={'form'}>
                            <input type="email" className="form-control" placeholder="E-mail" onChange={event => this.props.actions.saveUserLoginValue(event.target.value)} style={{ margin: "0 0 10px" }} />
                            <input type="password" className="form-control" placeholder="пароль" onChange={event => this.props.actions.saveUserPasswordValue(event.target.value)}  style={{ margin: "0 0 10px" }} />
                            <button className="btn btn-primary" onClick={() => this.onLogin()} style={{ margin: "0 0 10px" }}>Войти</button>
                            <Link to={"/reg"}>{'Зарегестрироваться'}</Link>
                        </div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        userActionsCreators,
        dispatch,
    )
});

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Wrapped;
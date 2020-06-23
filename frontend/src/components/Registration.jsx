import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import axios from 'axios';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogin: '',
            userPassword: '',
            userName: '',
            isReged: false,
        };

        this.onReg = this.onReg.bind(this);
        this.onInputChageLog = this.onInputChageLog.bind(this);
        this.onInputChagePas = this.onInputChagePas.bind(this);
        this.onInputChageName = this.onInputChageName.bind(this);
    }

    onInputChageLog(e) {
        this.setState({
            userLogin: e.target.value,
        });
    }
    onInputChagePas(e) {
        this.setState({
            userPassword: e.target.value,
        });
    }
    onInputChageName(e) {
        this.setState({
            userName: e.target.value,
        });
    }

    async onReg() {
        //console.log("=============\nreg start");
        let params = {
            email: this.state.userLogin,
            password: this.state.userPassword,
            name: this.state.userName || "noname",
        };
        let res;
        try {       
            res = await axios.post("http://localhost:3000/register", params);
            //console.log("=========\nполученный с сервера ответ на регистрацию", res.data);
        } catch(e) {
            //alert("Данные введены некорректно либо пользователь с таким имейлом уже существует");
            //console.log(e);
        }

        //console.log(res);
        if (res.status === 200) {
            this.setState({
                isReged: true,
            });
        } else {
            alert("Данные введены некорректно либо пользователь с таким имейлом уже существует");
        }
    }

    render() {
        return (
            <div className={'login'} style={{flex: "1", marginTop: "10px"}}>
                    {
                        (!this.state.isReged) ?
                            <div className={'form'}>
                                <p>Для регистрации введите корректный адрес эл. почты и пароль не короче 8 символов. Если вы не введете имя, вам будет дано имя "noname".</p>
                                <ul>
                                    <div style={{ width: "300px" }}>
                                        <li>Электронная почта</li>
                                        <input type="email" className="form-control" placeholder="E-mail" onChange={event => this.onInputChageLog(event)}/>
                                        <li>Пароль</li>
                                        <input type="password" className="form-control" placeholder="пароль" onChange={event => this.onInputChagePas(event)}/>
                                        <li>Ваше имя</li>
                                        <input type="name" className="form-control" placeholder="имя" onChange={event => this.onInputChageName(event)}/>
                                        <button className="btn btn-primary" onClick={() => this.onReg()} style={{marginTop: "7px"}}>Зарегистрироваться</button>
                                    </div>
                                </ul>
                            </div>
                            :
                            <h2>Теперь вы можете войти на сайт по указанным почте и паролю</h2>
                    }
            </div>
        )
    }
}

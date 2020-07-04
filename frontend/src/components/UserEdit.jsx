import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import axios from 'axios';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class UserEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
            Name: '',
            Bio: '',
            email: '',
            password: '',
            isChanged: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onInputChageImgUrl = this.onInputChageImgUrl.bind(this);
        this.onInputChageName = this.onInputChageName.bind(this);
        this.onInputChageBio = this.onInputChageBio.bind(this);
        this.onInputChagePassword = this.onInputChagePassword.bind(this);
    }

    onInputChageImgUrl(e) {
        this.setState({
            imgUrl: e.target.value,
        });
    }
    onInputChageName(e) {
        this.setState({
            Name: e.target.value,
        });
    }
    onInputChageBio(e) {
        this.setState({
            Bio: e.target.value,
        });
    }
    onInputChagePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    async onChange() {
        //const bearer = "Bearer " + this.props.user.userToken;
        let params = {
            img: this.state.imgUrl,
            name: this.state.Name,
            bio: this.state.Bio,
            password: this.state.password,
            token: this.props.user.userToken,
            // headers: {
            //     Authorization: bearer,
            // },
        };
        //console.log(params, params.headers);
        let res;
        try {
            res = await axios.post("http://localhost:3000/edit", params);
            //console.log("=========\nполученный с сервера ответ на пост", res.data);
        } catch(e) {
            alert("При редактировании произошла ошибка");
            //console.log(e);
        }

        //console.log(res);
        if (res.status === 200) {
            this.setState({
                isChanged: true,
            });
        } else {
            alert("При редактировании произошла ошибка");
        }
    }

    render() {
        return (
            <div className={'create-post'} style={{flex: "1", marginTop: "10px"}}>
                    {
                        (this.props.user.isLoggedIn) ?
                            (!this.state.isChanged) ?
                                <div className={'form'}>
                                    <p>Для редактирования страницы введите данные, заполняя только те поля, которые хотите изменить.</p>
                                    <ul>
                                        <div style={{ width: "300px" }}>
                                            <li>Ссылка на фотографию профиля</li>
                                            <input type="text" className="form-control" placeholder="Ссылка на изображение" onChange={event => this.onInputChageImgUrl(event)}/>
                                            <li>Имя</li>
                                            <input type="text" className="form-control" placeholder="Имя" onChange={event => this.onInputChageName(event)}/>
                                            <li>Информация о себе</li>
                                            <input type="text" className="form-control" placeholder="Информация" onChange={event => this.onInputChageBio(event)}/>
                                            <li>Пароль (минимальная длина - 8 символов)</li>
                                            <input type="text" className="form-control" placeholder="Пароль" onChange={event => this.onInputChagePassword(event)}/>
                                            <button className="btn btn-primary" onClick={() => this.onChange()} style={{marginTop: "7px"}}>Применить изменения</button>
                                        </div>
                                    </ul>
                                </div>
                                :
                                <h2>Изменения были применены, обновите страницу</h2>
                        :
                        <h2>Изменять свои данные могут только авторизированные пользователи</h2>
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
        dispatch,
    )
});

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(UserEdit);

export default Wrapped;
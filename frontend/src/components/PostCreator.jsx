import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import axios from 'axios';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class PostCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
            postName: '',
            isPosted: false,
        };

        this.onPost = this.onPost.bind(this);
        this.onInputChageImgUrl = this.onInputChageImgUrl.bind(this);
        this.onInputChagePostName = this.onInputChagePostName.bind(this);
    }

    onInputChageImgUrl(e) {
        this.setState({
            imgUrl: e.target.value,
        });
    }
    onInputChagePostName(e) {
        this.setState({
            postName: e.target.value,
        });
    }

    async onPost() {
        let params = {
            img: this.state.imgUrl,
            name: this.state.postName,
            userToken: this.props.user.userToken,
        };
        //console.log(params, params.headers);
        let res;
        try {
            res = await axios.post("http://localhost:3000/createpost", params);
            //console.log("=========\nполученный с сервера ответ на пост", res.data);
        } catch(e) {
            alert("При создании поста произошла ошибка");
            //console.log(e);
        }

        //console.log(res);
        if (res.status === 200) {
            this.setState({
                isPosted: true,
            });
        } else {
            alert("При создании поста произошла ошибка");
        }
    }

    render() {
        return (
            <div className={'create-post'} style={{flex: "1", marginTop: "10px"}}>
                    {
                        (this.props.user.isLoggedIn) ?
                            (!this.state.isPosted) ?
                                <div className={'form'}>
                                    <p>Для создания поста введите ссылку на картинку, которую хотите вставить и (по желанию) можете добавить ему имя.</p>
                                    <ul>
                                        <div style={{ width: "300px" }}>
                                            <li>Ссылка на картинку</li>
                                            <input type="text" className="form-control" placeholder="Ссылка на изображение" onChange={event => this.onInputChageImgUrl(event)}/>
                                            <li>Имя поста</li>
                                            <input type="text" className="form-control" placeholder="Имя поста" onChange={event => this.onInputChagePostName(event)}/>
                                            <button className="btn btn-primary" onClick={() => this.onPost()} style={{marginTop: "7px"}}>Запостить</button>
                                        </div>
                                    </ul>
                                </div>
                                :
                                <h2>Ваш пост был опубликован.</h2>
                        :
                        <h2>Публиковать посты могут только авторизированные пользователи</h2>
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

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(PostCreator);

export default Wrapped;
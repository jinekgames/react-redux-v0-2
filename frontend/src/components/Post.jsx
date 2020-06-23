import React from 'react';
import "bootstrap/dist/css/bootstrap.css"

const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
]

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        let buf = Math.random() * 100;  //к сожалению, лайки пока просто рандомные числа :С
        this.state = {
            counter: (buf - buf % 1),
            isLiked: false
        };
    }

    likeClick () {
        this.setState({
            counter: (this.state.isLiked) ? --this.state.counter : ++this.state.counter,
            isLiked: !this.state.isLiked
        });
    }

    render() {
        //вычисление даты из timestamp
        const date = new Date(this.props.curPost.date * 1000);
        const postDate = "" + date.getDay() + " " + (months[date.getMonth()]) + " " + date.getFullYear();

        return (
            <div className={'card'} style={{width: "18rem", margin: "10px"}}>
                 <img src={this.props.curPost.img} className="card-img-top" alt="meme1" />
                 <div className="card-body">
                    <h5 className="card-title">{this.props.curPost.user}</h5>
                    <p className="card-text">{postDate}</p>
                    <a href={this.props.curPost.img} className="btn btn-primary">Открыть</a>
                    <a onClick={() => this.likeClick()} className="btn btn-primary" style={{backgroundColor: (this.state.isLiked) ? "#f00" : "#c0c0c0", marginLeft: "5px"}}>{this.state.counter}</a>
                </div>
            </div>
        )
    }
}

import Post from "./Post.jsx"
import React from "react";
import axios from 'axios';

//тк новые посты создавать пока нельзя через интерфейс сайта, для демонстрации я поместил посты из моей базы данных в локальный json файл
//чтобы показывались именно они, необходимо раскомментировать код в функции fetchUsers() (код обращения к серверу станет закомментирован самостоятельно)
import postsExmpls from "./PostsExample/postsExmpls.json";

export default class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: false,
        }
    }

    async fetchPosts() {

        // /*
        this.setState({
            isLoading: true,
        });
        try {
            const response = await axios.get('http://localhost:3000/posts');
            this.setState({
                posts: response.data.posts,
            });
        } catch (e) {
            console.log('error', e);

        } finally {
            this.setState({
                isLoading: false,
            });
        }
        // */
        // this.setState({
        //  posts: postsExmpls,
        // });

    }

    componentDidMount() {
        this.fetchPosts();
    }

    render() {
        return (
            <div>
            { this.state.isLoading && 
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
                <div className="content" style={{display: "flex", flexWrap: "wrap"}}>
                    {
                        this.state.posts.map(post => {
                            return (
                                <Post curPost={post} key={post.id}/>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}


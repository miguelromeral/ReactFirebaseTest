import React from "react";
import firestore, { auth } from "../firebase.config";
import Message from "../classes/messageClass"
import MessaageElement from "../components/messageElement"
import Error from './error'
import Layout from "../components/layout";
import { Link } from 'react-router-dom'
import Loading from "../components/loading";

class CreateMssagePage extends React.Component {

    state = {
        content: '',
        user: null,
        loading: false,
        error: false,
        added: '',
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            console.log("on Auth state Changed: " + user.uid)
            this.setState({
                user
            })
        })
    }


    render() {
        var user = this.state.user

        if (user == null || user == undefined) {
            return <Error description="Sin usuario" />
        }

        if (this.state.error) {
            return <Error description={this.state.error} />
        }

        return (
            <React.Fragment>
                <h1>Create Message!</h1>
                {
                    this.state.loading ?
                        <Loading />
                        :
                        this.render2(this.state)
                }
            </React.Fragment>
        )
    }

    submit = async e => {
        try {
            this.setState({
                loading: true,
                error: false,
            })
            var uid = this.state.user.uid
            console.log("Adding to collection " + uid)
            await firestore.collection(`${uid}`)
                .add({
                    content: this.state.content,
                }).then((res) => {
                    console.log('Added!: res: ' + res);
                    this.setState({
                        added: res.id,
                        loading: false,
                    })
                });
        } catch (e) {
            this.setState({
                loading: false,
                error: true,
            })
        }
    }

    handleChange = e => {
        e.preventDefault()
        var value = e.target.value

        this.setState({
            content: value,
        })
    }


    render2(state) {
        if (state.added != '') {
            return (
                <React.Fragment>
                    <div>
                        Added!
                    </div>
                    <div>
                        <Link to="/messages">Go To Messages</Link>
                    </div>
                    <div>
                        <Link to={`/messages/${state.added}`}>Go To {state.added} Message Detail</Link>
                    </div>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <div class="input-group">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Write some content"
                        name="content"
                        value={this.state.content}
                        onChange={this.handleChange}>
                    </input>


                    <input
                        className="form-control btn btn-primary"
                        type="button"
                        name="create"
                        value="Create"
                        onClick={this.submit}
                    />


                </div>
            </React.Fragment>
        )
    }

};

export default CreateMssagePage
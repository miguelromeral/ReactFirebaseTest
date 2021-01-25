import React from "react";
import firestore, { auth } from "../firebase.config";
import Message from "../classes/messageClass"
import MessaageElement from "../components/messageElement"
import Error from './error'
import Layout from "../components/layout";
import Loading from "../components/loading";

class CreateMssagePage extends React.Component {

    state = {
        content: '',
        user: null,
        loading: false,
        error: false,
        added: false,
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            console.log("on Auth state Changed: " + user.uid)
            this.update(user)
        })
    }

    update(user) {
        this.setState({
            user
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
            <Layout>
                <h1>Create Message!</h1>
                {
                    this.state.loading ?
                        <Loading />
                        :
                        this.render2(this.state)
                }
            </Layout>
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
                }).then(() => {
                    console.log('Added!');
                });
            this.setState({
                added: true,
                loading: false,
            })
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
        if (state.added) {
            return <div>Added!</div>
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
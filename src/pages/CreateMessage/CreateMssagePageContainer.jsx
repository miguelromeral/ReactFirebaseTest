import React from "react";
import firestore, { auth } from "../../firebase.config";
import Message from "../../classes/messageClass"
import MessaageElement from "../../components/messageElement"
import Error from '../error'
import Layout from "../layout";
import { Link } from 'react-router-dom'
import Loading from "../loading";
import CreateMessagePage from "./CreateMessagePage";

class CreateMssagePageContainer extends React.Component {

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
        return <CreateMessagePage
                    {...this.state}
                    handleChange={this.handleChange}
                    submit={this.submit}/>
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

};

export default CreateMssagePageContainer
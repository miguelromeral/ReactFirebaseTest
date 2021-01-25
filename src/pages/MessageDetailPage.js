import { render } from "@testing-library/react";
import React, { useContext } from "react";
import { matchPath, useHistory } from 'react-router-dom'
import MessageElement from "../components/messageElement";
import Message from "../classes/messageClass"
import firestore, { auth } from "../firebase.config"
import { UserContext } from "../providers/UserProvider";
import Error from "./error";

class MessageDetailPage extends React.Component {
    id = this.props.match.params.id

    state = {
        message: null,
        user: null,
        loading: false,
        error: false,
    }

    onResult = (documentSnapshot) => {

        var id = documentSnapshot.id
        var data = documentSnapshot.data()
        var msg = new Message(id, data.content)

        this.setState({
            message: msg,
            loading: false,
            error: false
        })
    }

    onError = (error) => {
        console.log('Error while getting messages: ' + error);
        this.setState({
            message: null,
            loading: false,
            error: error
        })
    }

    fetchData = async (user) => {
        try {
            console.log('Fetching data for user ' + user.uid + ", id: " + this.id);
            this.setState({
                data: [],
                loading: true,
                error: false,
            })
            await firestore.collection(`${user.uid}`).doc(this.id).onSnapshot(this.onResult, this.onError)
        } catch (e) {
            console.error("Error: " + e)
            this.setState({
                data: [],
                loading: false,
                error: e
            })
        }
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
        this.fetchData(user)
    }



    render() {
        return (
            <div>
                Message details page: <strong>{this.id}</strong>
                {this.state.message && <MessageElement {...this.state.message} showDetail={false}/>}
            </div>
        );
    }

};

export default MessageDetailPage;
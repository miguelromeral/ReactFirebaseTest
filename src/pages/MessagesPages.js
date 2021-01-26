import React from "react";
import firestore, { auth } from "../firebase.config";
import Message from "../classes/messageClass"
import MessaageElement from "../components/messageElement"
import Error from './error'
import Layout from "../components/layout";
import Loading from "../components/loading";

class MessagesPages extends React.Component {

    state = {
        data: [],
        user: null,
        loading: false,
        error: false,
    }

    onResult = (querySnapshot) => {
        console.log('Total messages: ', querySnapshot.size);
        const objectsArray = new Array();

        querySnapshot.forEach(documentSnapshot => {
            var id = documentSnapshot.id
            var data = documentSnapshot.data()
            objectsArray.push(new Message(id, data.content))
        });

        this.setState({
            data: objectsArray,
            loading: false,
            error: false
        })
    }

    onError = (error) => {
        console.log('Error while getting messages: ' + error);
        this.setState({
            data: [],
            loading: false,
            error: error
        })
    }

    fetchData = async (user) => {
        try {
            console.log('Fetching data for user ' + user.uid);
            this.setState({
                data: [],
                loading: true,
                error: false,
            })
            await firestore.collection(`${user.uid}`).onSnapshot(this.onResult, this.onError)
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
        var user = this.state.user

        if (user == null || user == undefined) {
            return <Error description="Sin usuario" />
        }

        if (this.state.error) {
            return <Error description={this.state.error} />
        }

        return (
            <React.Fragment>
                <h1>Messages!</h1>
                {
                    this.state.loading ?
                        <Loading />
                        :
                        this.render2(this.state.data)
                }</React.Fragment>
        )
    }

    render2(data) {
        if (data != null) {
            if (data.length != 0) {
                const listItems = data.map(data => (
                    <li key={data.id}>
                        <MessaageElement {...data} showDetail={true} />
                    </li>
                ))

                return (
                    <ul>{listItems}</ul>
                );
            } else {
                <div>
                    No messages for this user
                </div>
            }
        }
    }

};

export default MessagesPages
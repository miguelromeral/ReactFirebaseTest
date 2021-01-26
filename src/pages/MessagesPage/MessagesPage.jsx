import React from 'react'
import Loading from '../../pages/loading'
import Error from '../error'
import 'bootstrap/dist/css/bootstrap.css'
import Test from '../../components/testElement'
import { Link } from 'react-router-dom'
import MessaageElement from "../../components/messageElement"


const MessagePage = ({ data, user, loading, error }) => {
    if (user == null || user == undefined) {
        return <Error description="Sin usuario" />
    }

    if (error) {
        return <Error description={error} />
    }

    return (
        <React.Fragment>
            <h1>Messages!</h1>
            {
                loading ?
                    <Loading />
                    :
                    render2(data)
            }</React.Fragment>
    )
}


function render2(data) {
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
        }
    }
    return (
        <React.Fragment>
            <div>
                No messages for this user
        </div>
            <div>
                <Link to="/create" className="btn btn-primary">Create your first message</Link>
            </div>
        </React.Fragment>
    )
}

export default MessagePage
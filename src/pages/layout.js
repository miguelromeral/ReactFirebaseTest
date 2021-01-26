import React from "react";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'

function Layout(props) {
    const history = useHistory();

    return (
        <div>
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
                <a class="navbar-brand" href="/">React Firestore Test</a>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/messages">Messages</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/create">Create</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/profile">Profile</a>
                    </li>
                </ul>
            </nav>
            <div className="container">
                <div className="col-2"></div>
                <div className="col-8">
                    {props.children}
                </div>
                <div className="col-2"></div>
            </div>
        </div>

    )
}

export default Layout
import React from 'react'
import Home from './home'
import firestore, { auth } from '../../firebase.config'
import 'bootstrap/dist/css/bootstrap.css'
import Test from '../../classes/testClass'

/**
 * Container Component for Home page
 */
class HomeContainer extends React.Component {

    state = {
        user: null,
        loading: false,
        error: false,
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.setState({
                user
            })
        })
    }

    render() {
        return (
            <Home {...this.state} />
        )
    }

}

export default HomeContainer
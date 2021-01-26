import React from 'react'
import Layout from '../layout'
import Loading from '../../pages/loading'
import Error from '../error'
import 'bootstrap/dist/css/bootstrap.css'
import Test from '../../components/testElement'
import { Link } from 'react-router-dom'

/**
 * Presentational Component for Home page
 */
const Home = ({ user, loading, error }) => (
    display(user, loading, error)

)

export default Home


function display(user, loading, error) {

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <Error description={error} />
    }

    if (user == null) {
        return (
            <React.Fragment>
                <Link to="/signin">Sign In</Link>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div>
                <Link to="/messages" className="btn btn-primary">My Messages</Link>
            </div>
            <div>
                <Link to="/create" className="btn btn-success">Create Message</Link>
            </div>
            <div>
                <Link to="/profile" className="btn btn-warning">Profile</Link>
            </div>
        </React.Fragment>
    )

}
import React from 'react'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import Error from '../error'
import 'bootstrap/dist/css/bootstrap.css'
import Test from '../../components/testElement'

/**
 * Presentational Component for Home page
 */
const Home = ({ data, loading, error }) => (
    <React.Fragment>
        <Layout>
            <div>
                {display(data, loading, error)}
            </div>

        </Layout>
    </React.Fragment>

)

export default Home


function display(data, loading, error) {
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <Error description={error} />
    }
    if (data.length === 0) {
        return <h5>No facts found</h5>
    } else {
       // return <h4>{data.length}</h4>

        const listItems = data.map((test) =>
            <li key={test.id}>
                <Test {...test} />
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );

    }

}
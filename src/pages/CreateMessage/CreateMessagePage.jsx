import React from 'react'
import Layout from '../layout'
import Loading from '../../pages/loading'
import Error from '../error'
import 'bootstrap/dist/css/bootstrap.css'
import Test from '../../components/testElement'
import { Link } from 'react-router-dom'


const CreateMessagePage = ({ content, user, loading, error, added, handleChange, submit }) => {
    if (user == null || user == undefined) {
        return <Error description="Sin usuario" />
    }

    if (error) {
        return <Error description={error} />
    }

    return (
        <React.Fragment>
            <h1>Create Message!</h1>
            {
                loading ?
                    <Loading />
                    :
                    render2(content, user, loading, error, added, handleChange, submit)
            }
        </React.Fragment>
    )
}



function render2(content, user, loading, error, added, handleChange, submit) {
    if (added != '') {
        return (
            <React.Fragment>
                <div>
                    Added!
                </div>
                <div>
                    <Link to="/messages">Go To Messages</Link>
                </div>
                <div>
                    <Link to={`/messages/${added}`}>Go To {added} Message Detail</Link>
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
                    value={content}
                    onChange={handleChange}>
                </input>


                <input
                    className="form-control btn btn-primary"
                    type="button"
                    name="create"
                    value="Create"
                    onClick={submit}
                />


            </div>
        </React.Fragment>
    )
}

export default CreateMessagePage
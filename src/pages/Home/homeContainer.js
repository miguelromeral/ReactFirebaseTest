import React from 'react'
import Home from './home'
import db from '../../firebase.config'
import 'bootstrap/dist/css/bootstrap.css'
import Test from '../../classes/testClass'
import TestElement from '../../components/testElement'

/**
 * Container Component for Home page
 */
class HomeContainer extends React.Component {

    state = {
        data: [],
        loading: false,
        error: false,
    }

    onResult = (querySnapshot) => {
        console.log('Total users: ', querySnapshot.size);
        const objectsArray = new Array();

        querySnapshot.forEach(documentSnapshot => {
            var id = documentSnapshot.id
            var data = documentSnapshot.data()
            objectsArray.push(new Test(id, data.name, data.value))
        });

        this.setState({
            data: objectsArray,
            loading: false,
            error: false,
        })
    }

    onError = (error) => {
        this.setState({
            data: [],
            loading: false,
            error: error.message,
        })
    }


    fetchData = async () => {
        try {
            this.setState({
                loading: true,
                error: false,
            })
            await db.collection('test')
                .onSnapshot(this.onResult, this.onError)
        } catch (e) {
            console.error("Error: " + e)
            this.setState({
                loading: false,
                error: e.message,
            })
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return (
            <Home {...this.state} />
        )
    }

}

export default HomeContainer
import { React, useState, useEffect } from 'react'
import { useHistory, Redirect, Link } from 'react-router-dom'


function AuthenticatedRoute(component, user) {
    if (user == undefined || user == null) {
        /*<Redirect
            to={'/signin'}
        />*/
        return <div>No autenticado</div>
    } else {
        return <div>Hola</div>
    }

}

export default AuthenticatedRoute
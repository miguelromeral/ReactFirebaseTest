/**
 * Manages the app's diferent states
 */

import React from 'react'
import HomeContainer from './pages/Home/homeContainer'
import Error from './pages/error'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import ProfilePage from './pages/profilePage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PasswordReset from './pages/passwordReset'

function App() {
  return (
    // Diferent routes the app will have
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={HomeContainer}
        />
        <Route
          exact
          path="/signin"
          component={SignIn}
        />
        <Route
          exact
          path="/signup"
          component={SignUp}
        />
        <Route
          exact
          path="/profile"
          component={ProfilePage}
        />
        <Route
          exact
          path="/passwordReset"
          component={PasswordReset}
        />
        <Route
          component={Error}
        />

      </Switch>
    </BrowserRouter>
  )
}

export default App

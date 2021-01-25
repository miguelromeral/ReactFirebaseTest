/**
 * Manages the app's diferent states
 */

import { React, useContext } from 'react'
import HomeContainer from './pages/Home/homeContainer'
import { UserContext } from './providers/UserProvider';
import Error from './pages/error'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import ProfilePage from './pages/profilePage'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import PasswordReset from './pages/passwordReset'
import MessagesPage from './pages/MessagesPage'
import MessagesPages from './pages/MessagesPages'
import AuthenticatedRoute from './components/AuthenticatedRoute'

function App() {
  const user = useContext(UserContext);

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
          path="/messages"
          component={MessagesPages}
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

function userAuthenticated(user) {
  return (user !== undefined && user !== null)
}

export default App

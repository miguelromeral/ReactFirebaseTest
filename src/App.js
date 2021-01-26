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
import MessagesPageContainer from './pages/MessagesPage/MessagesPageContainer'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import CreateMssagePageContainer from './pages/CreateMessage/CreateMssagePageContainer';
import MessageDetailPage from './pages/MessageDetailPage';
import Layout from './pages/layout';

function App() {
  const user = useContext(UserContext);

  return (
    // Diferent routes the app will have
    <Layout>
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
            component={MessagesPageContainer}
          />
          <Route
            exact
            path="/create"
            component={CreateMssagePageContainer}
          />
          <Route path="/messages/:id" exact component={MessageDetailPage} />
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
    </Layout>
  )
}

function userAuthenticated(user) {
  return (user !== undefined && user !== null)
}

export default App

import React, { useState, useEffect } from 'react';
/* Route management */
import { Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './App.css';

import { Context, ContextPersist } from "./store/context"
import { AuthService } from './services/AuthService';

/* Views */
import HomeView from './views/Home/HomeView';
import UserListView from './views/User/UserList/UserListView';
import FriendshipListView from './views/Lesson/FriendshipList/FriendshipListView';
import UserLessonListView from './views/Lesson/UserLessonList/UserLessonListView';
import UserFriendshipListView from './views/Lesson/UserFriendshipList/UserFriendshipListView';
import WeatherView from './views/Weather/WeatherView';

import ProtectedRoute from './components/molecules/ProtectedRoute/ProtectedRoute';
import SignInView from './views/Auth/Login/SignInView';

function App() {
    /* App function */

    /* A hook that provides access to the navigation history, allowing redirection of the user to different routes */
    const history = useHistory();

    /* useState allows you to manage local state within the component */
    const [user, setUser] = useState(null);

    /* User Load Effect */

    /* Loads the current user from AuthService when the component mounts */
    useEffect(() => {
        /* Attempts to retrieve information about the authenticated user */
        AuthService.loadUser()
            .then(user => {
                setUser(user);
            }).catch(error => {
                console.log(error)
            }
            );

        /* Subscribes to changes in the user's state. If the user logs out (user_event === null), redirects to the login page */
        const currentUserObserver = AuthService.currentUser.subscribe(user_event => {
            if (user != null && user_event === null) {
                history.push('/login');
            }

            setUser(user_event);
        });

        return function cleanup() {
            currentUserObserver.unsubscribe();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /* Routes Structure */

    return (
        /* Components that wrap the application so that all child components can access the global context */
        <ContextPersist><Context>

            <main>
            {/* Wraps the routes and ensures that only one route is rendered at a time */}
                <Switch>
                    <React.Fragment>
                        {/* Route for the login view */}
                        <Route path='/login' component={SignInView} />
                        {/* { (load && !user) &&
                        <div>
                            <Route path='/login' component={SignInView} />
                        </div>
                        }
                        { (load && user) && */}
                        <div>
                            {/* Protected routes */}
                            <ProtectedRoute path='/home' component={HomeView} />
                            <ProtectedRoute path='/users' component={UserListView} />
                            <ProtectedRoute path='/friendships' component={FriendshipListView} />
                            <ProtectedRoute path='/user-lessons/:user' component={UserLessonListView} />
                            <ProtectedRoute path='/user-friendships/:user' component={UserFriendshipListView} />
                            <ProtectedRoute path='/weather' component={WeatherView} />
                            
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                        </div>
                        {/* } */}
                    </React.Fragment>
                </Switch>
            </main>
        </Context></ContextPersist>

    );
}

export default App;

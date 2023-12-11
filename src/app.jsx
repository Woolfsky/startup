import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Tasks } from './tasks/tasks';
import { Sessions } from './sessions/sessions';
import { Community } from './community/community';
import { AuthState } from './login/authState';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
        <div className="body" >
            {/* Header */}
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <h1 className="focusH1" >focus</h1>

                {/* Menu */}
                <ul className="nav justify-content-end">
                {authState === AuthState.Authenticated && (
                    <li className="nav-item"><NavLink className="nav-link" to="login">Welcome</NavLink></li>
                )}
                {authState === AuthState.Authenticated && (
                    <li className="nav-item"><NavLink className="nav-link" aria-current="page" to="tasks">Tasks</NavLink></li>
                )}
                {authState === AuthState.Authenticated && (
                    <li className="nav-item"><NavLink className="nav-link" to="sessions">Sessions</NavLink></li>
                )}
                {authState === AuthState.Authenticated && (
                    <li className="nav-item"><NavLink className="nav-link" to="community">Community</NavLink></li>
                )}
                </ul>

                {/* Login */}
                {/* {authState === AuthState.Authenticated && (
                    <div className="col-md-1 text-center">
                        <button id="logout_button" type="button" className="btn btn-outline-secondary" onClick={() => logout_()}>Logout</button>
                    </div>
                )} */}

                <hr />
            </header>

            <Routes>
                <Route
                    path='/'
                    element={
                    <Login
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                        }}
                    />
                    }
                    exact
                />
                <Route path='/login' element={
                    <Login
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                        }}
                    />
                    } exact />
                <Route path='/tasks' element={<Tasks />} />
                <Route path='/sessions' element={<Sessions />} />
                <Route path='/community' element={<Community />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            {/* Footer */}
            <footer>
                <span>Creator's GitHub can be found</span> <a href="https://github.com/Woolfsky/startup/tree/main">here</a>
            </footer>
        </div>
    </BrowserRouter>
  )
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
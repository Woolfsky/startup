import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body" >
        {/* Header */}
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <h1 className="focusH1" >focus</h1>

            {/* Menu */}
            <ul className="nav justify-content-end">
                <li className="nav-item"><a className="nav-link" aria-current="page" href="tasks.html">Tasks</a></li>
                <li className="nav-item"><a className="nav-link" href="sessions.html">Sessions</a></li>
                <li className="nav-item"><a className="nav-link" href="community.html">Community</a></li>
            </ul>

            {/* Login */}
            <div className="col-md-1 text-center">
                <button id="logout_button" type="button" className="btn btn-outline-secondary" >Logout</button>
            {/* this button ^^ is missing this code: onClick='logout()' */}
            </div>

            <hr />
        </header>

        <main>App components go here</main>

        {/* Footer */}
        <footer>
            <span>Creator's GitHub can be found</span> <a href="https://github.com/Woolfsky/startup/tree/main">here</a>
        </footer>
    </div>
  )
}
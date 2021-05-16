import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import {Login} from './login';
import {Register} from './register';
import {Info} from './info';

//UNDOUNDO
export default function AuthPage(){
    return(
        <div>
            <Router>
                <Redirect to="/info"></Redirect>
                <nav className="navbar fixed-top navbar-dark navbar-expand-lg bg-primary">
                    <Link className="navbar-brand" to="/info" style={{
                        fontWeight:700
                    }}>
                        Save Water
                    </Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarTogglerDemo01" 
                        aria-controls="navbarTogglerDemo01" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/info" component={Info} />
            </Router>
        </div>
    )
}


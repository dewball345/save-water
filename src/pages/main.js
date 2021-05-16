import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
// import {Login} from './login';
// import {Register} from './register';
// import {Info} from './info';
import {Dashboard} from './dashboard';
import {CreateShower} from './createshower';
import { FBAuthContext } from '../providers/firebaseauthprovider';
import {DBContext} from '../providers/firebasedbprovider';
import {useContext} from 'react';
import {CreateBath} from './createbath';
import {Info} from './info';
import * as i from 'idb-keyval';

//UNDOUNDO
export default function Main(){
    let context = useContext(FBAuthContext)
    let db = useContext(DBContext);
    // console.log(context);

    // console.log("CURRENT USER DATA:")
    // console.log(db.encrypt({}))

    return(
        <Router>
            <Redirect to="/dashboard"></Redirect>
            <nav className="navbar fixed-top navbar-dark navbar-expand-lg bg-primary">
                    {/* <Link className="navbar-brand" style={{
                        fontWeight:700
                    }}>
                        {context.currentUser.email}'s Dashboard
                    </Link> */}
                    <Link to ="/dashboard" className="navbar-brand">
                        <span style={{
                            fontWeight: 700
                        }}>
                            {context.currentUser.email.split("@")[0]}'s
                        </span> Dashboard   
                    </Link>
                    
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarTogglerDemo03" 
                    aria-controls="navbarTogglerDemo03" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                        <Link className = "nav-link" to="/createbath"> Track water usage</Link>
                        </li>
                        <li className="nav-item">
                            <Link className = "nav-link" to="/createshower"> Add a shower </Link>
                        </li>
                        <li className="nav-item">
                            <Link className = "nav-link" to="/info"> Site info </Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn nav-link" onClick={() => {
                                db.syncData()
                            }}>
                                Sync Data
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn nav-link" onClick={async () => {
                                // db.clear()
                                window.localStorage.clear()
                                await i.clear()
                                context.logout()
                                // window.location = "/"
                            }}>
                                Logout
                            </button>
                        </li>

                    </ul>
                </div>
            </nav>
            {/* <h1>
               You have authenticated successfully so yeah 
            </h1> */}
            <Route path="/createshower" component={CreateShower} />
            <Route path="/createbath" component={CreateBath} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/info" component={Info} />
        </Router>
    )
}
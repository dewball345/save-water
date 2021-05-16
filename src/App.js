import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './scss/custom.scss';
// import {AuthPage} from './pages/authpage.js';

// import {PrivateRoute} from './widgets/privateroute';
// import {Main} from './pages/main.js';
// import {FirebaseAuthProvider} from './providers/firebaseauthprovider.js';
// import {FirebaseDBProvider} from './providers/firebasedbprovider.js';

//UNDO HERE: 4/13/21, lazy loading

const AuthPage = lazy(() => import('./pages/authpage.js'));
const PrivateRoute = lazy(() => import('./widgets/privateroute'));
const Main = lazy(() => import('./pages/main.js'));
const FirebaseAuthProvider = lazy(() => import('./providers/firebaseauthprovider.js'));
const FirebaseDBProvider = lazy(() => import('./providers/firebasedbprovider.js'));
// import {Login} from './pages/login';
// import {Register} from './pages/register';
// import {Info} from './pages/info';
// import $ from 'jquery';
// import Popper from 'popper.js';


function App() {
  return (
    <Suspense fallback={(() => <div className = "card bg-primary m-2">

      <h1 className="card-body text-white" style={{
        fontWeight: "bolder"
      }}>
        Hey! Did you know the average person uses 17 gallons during each shower? 
      </h1>
    </div>)()}>
      <div className="pseudo-body" style={{
        paddingTop:"100px",
      }}>
        
          <FirebaseAuthProvider>
              <Router>
                <FirebaseDBProvider>
                  <PrivateRoute path="/" component={Main} />
                </FirebaseDBProvider>
                <Route path="/authpage" component={AuthPage} />
                {/* <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/info" component={Info} /> */}
              </Router>
          </FirebaseAuthProvider>
        
      </div>
    </Suspense>
  );
}

export default App;

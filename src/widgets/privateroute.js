import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {FBAuthContext} from '../providers/firebaseauthprovider.js';

//UNDOUNDO
export default function PrivateRoute({component: Component, ...rest}){
    let context = useContext(FBAuthContext)
    return(
        <Route {...rest}
            render={props => {
                // console.log("CURRENT USER")
                // console.log(context.currentUser)
                // console.log(context.isloading)
                // console.log("END")
                if(context.isloading){
                    console.log("Context is loading")
                    return (
                        <div className="container d-flex align-items-center justify-content-center" style={{
                            minHeight:"100vh"
                        }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )
                }else if(context.currentUser === undefined){
                    // console.log("Currentuser is undefined")
                    return <Redirect to="/authpage" />
                } else if(context.currentUser === null){
                    // console.log("Currentuser is null");
                    return <Redirect to="/authpage" />
                } else {
                    // console.log("current user is")
                    // console.log(context.currentUser)
                    return <Component {...props} />
                }
            }}>

        </Route>
    );

}
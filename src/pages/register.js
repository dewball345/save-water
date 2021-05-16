import {TextBox} from '../widgets/textbox.js';
// import {Link} from 'react-router-dom';
import {useState, useContext} from 'react';
import {FBAuthContext} from '../providers/firebaseauthprovider.js';

// import "bootstrap/dist/css/bootstrap.min.css";
// import '../scss/custom.scss';

export function Register(props){
    const [username, changeUsername] = useState("");
    const [password, changePassword] = useState("");
    
    const [confirm, changeConfirm] = useState("");
    const [error, changeError] = useState("");
    // const [name, changeName] = useState();
    let auth = useContext(FBAuthContext)
    
    async function onSubmit(e){
        e.preventDefault()
        try{
            // console.log(username)
            // console.log(password)
            if(password === ""){
                throw {code: "enter password"}
            }
            if(password !== confirm){
                throw {code: "confirm error"}
            }
            await auth.register(username, password);
            window.location = "/"
        } catch(error){
            changeError(error.code)
        }
    }  

    return(
        <div className="container d-flex" style={{
            minHeight:"100vh"
        }}>
            <div className="container-sm align-self-center" style={{
                maxWidth: 400 + "px"
            }}>
                {(() => {
                    if(error === "auth/email-already-in-use"){
                        return (<div className="card bg-danger text-white mb-3">
                            <div className="card-body"> 
                                <h3 style={{
                                    fontWeight:"bolder"
                                }}>This email address is used by another account</h3>
                            </div>
                        </div> )
                    } else if(error === "auth/weak-password"){
                        return(<div className="card bg-danger text-white mb-3">
                                    <div className="card-body"> 
                                        <h3 style={{
                                            fontWeight:"bolder"
                                        }}>Password should be at least 6 characters.</h3>
                                    </div>
                                </div> 
                            )
                    } else if(error === "confirm error"){
                        return(<div className="card bg-danger text-white mb-3">
                                <div className="card-body"> 
                                    <h3 style={{
                                        fontWeight:"bolder"
                                    }}>Password and Confirm Password fields do not match</h3>
                                </div>
                            </div> 
                        )
                    } else if(error === "enter password"){
                        return(<div className="card bg-danger text-white mb-3">
                        <div className="card-body"> 
                            <h3 style={{
                                fontWeight:"bolder"
                            }}>Enter Password</h3>
                        </div>
                    </div> 
                )    
                    }
                })()}
                <div className = "card bg-primary text-white">
                    <div className = "card-body">
                        <h1 className="page-header" style={{
                            fontWeight: 700
                        }}>
                            Register
                        </h1>
                        <div style={{
                            margin: "20px"
                        }}/>
                        <form onSubmit={onSubmit}>
                            <TextBox type="email" title="Enter Email" onChange={(e) => {
                                changeUsername(e.target.value)
                            }}/>
                            <TextBox type="password" title="Enter Password" onChange={(e) => {
                            changePassword(e.target.value)
                            }}/>
                            <TextBox type="password" title="Confirm Password" onChange={(e) => {
                                changeConfirm(e.target.value)
                            }}/>
                            <input type="submit" className="btn btn-light" />
                        </form>
                    </div>
                </div>

                
                <div style={{
                    margin: "20px"
                }}/>
            </div>
        </div>
    )
}
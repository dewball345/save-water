import {TextBox} from '../widgets/textbox.js';
// import {Link, useHistory} from 'react-router-dom';
import {useState, useContext} from 'react';
import {FBAuthContext} from '../providers/firebaseauthprovider.js';
// import "bootstrap/dist/css/bootstrap.min.css";
// import '../scss/custom.scss';

export function Login(props){
    let auth = useContext(FBAuthContext)
    const [username, changeUsername] = useState();
    const [password, changePassword] = useState();
    const [error, setError] = useState("");
    // const history = useHistory()

    async function onSubmit(event){
        event.preventDefault();
        //FINDAWAY: add forgot password. <-- cannot do this one
        try{
            console.log(await auth.login(username, password));
            // history.push("/")
            window.location = "/";
        } catch(error){
            console.log(error.code)
            setError(error.code)
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
                    if(error === "auth/user-not-found"){
                        return (<div className="card bg-danger text-white mb-3">
                            <div className="card-body"> 
                                <h3 style={{
                                    fontWeight:"bolder"
                                }}>This user does not exist.</h3>
                            </div>
                        </div> )
                    } else if(error === "auth/wrong-password"){
                        return(<div className="card bg-danger text-white mb-3">
                                    <div className="card-body"> 
                                        <h3 style={{
                                            fontWeight:"bolder"
                                        }}>Invalid Password.</h3>
                                    </div>
                                </div> 
                            )
                    } else if(error === "auth/argument-error"){
                        return(<div className="card bg-danger text-white mb-3">
                                    <div className="card-body"> 
                                        <h3 style={{
                                            fontWeight:"bolder"
                                        }}>One or all of your arguments were incorrect.</h3>
                                    </div>
                                </div> 
                            )
                    }
                })()}
                <div className="card bg-primary text-white">
                    <div className="card-body">
                        <h1 className="page-header" style={{
                            fontWeight: 700
                        }}>
                            Login
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
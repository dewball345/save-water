import { TextBox } from "../widgets/textbox.js";
// import { Link, useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
// import { FBAuthContext } from "../providers/firebaseauthprovider.js";
import { DBContext } from "../providers/firebasedbprovider.js";
import { Stopwatch } from "../widgets/Stopwatch";


export function CreateShower(props) {
  const [seconds, changeSeconds] = useState(0);
  const [didStart, changeStart] = useState(false);
  const [capacity, changeCapacity] = useState(0);
  const [name, changeName] = useState();
  const [error, changeError] = useState(null);

  let db = useContext(DBContext);

  function round(num){
    return Math.round((num + Number.EPSILON) * 100) / 100
  }

  useEffect(() => {
    // console.log("Something changed")
    if (didStart) {
      setTimeout(() => {
        changeSeconds(round(seconds + 0.1));
      }, 100);
    }
  });

  async function onSubmit(event) {
    event.preventDefault();
    try{
      console.log(capacity);
      console.log(name);
      console.log(seconds);
      let amount = parseFloat(capacity);
      let time = parseFloat(seconds);
      if(db.data.showers != null || db.data.showers != undefined){
        let showers = Object.keys(db.data.showers)
        console.log(showers)
        if(showers.includes(name) || capacity === "" || capacity === 0){
          let errCode = {}
          if(showers.includes(name)){
            errCode.shower = true
          } 
          if(capacity === "" || capacity === 0){
            errCode.blank = true
          }
          throw errCode
        } 
      }
      console.log("RATE: " + (amount/db.multiplier.value) / time)
      await db.writeUserData("showers/" + name, {
        rate: (amount/db.multiplier.value) / time,
        name: name,
      });
      window.location = "/";
    } catch(error) {
      console.log(error)
      changeError(error)
    }
  }
  return (
    <div
      className="container d-flex"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="container-sm align-self-center">
        <div className="card bg-primary text-white">
          <div className="card-body">
            <h1
              className="page-header"
              style={{
                fontWeight: "bolder",
              }}
            >
              Create Shower
            </h1>
            <div
              style={{
                margin: "20px",
              }}
            />
            <p>
              To keep track of how much water you use during showering, you need
              to give the rate at which the water flows in your shower.
            </p>

            <h4>Instructions:</h4>
            <ol>
              <li>If you haven't already, set your preferred unit in the dashboard page.</li>
              <li>Start your shower</li>
              <li>Click the button to start the timer.</li>
              <li>
                While the timer is running, fill a container(with your preferred unit) with
                water.
              </li>
              <li>
                When you have finished filling the container, stop the timer
              </li>
              <li>
                Record the amount of water filled and the name of shower. We've
                got the time already
              </li>
              <li>Sometimes, your shower may provide a rate for you. If this is the case, edit the time as needed. For example, if the rate given was 2 gallons/minute, set the time to 60 and capacity to 2</li>
            </ol>
          </div>
        </div>

        <div
          style={{
            margin: "30px",
          }}
        />

        <div
          style={{
            margin: "20px",
          }}
        />
        <div className="row">
          <div className="col-sm">
            <Stopwatch
              seconds={seconds}
              changeStart={changeStart}
              didStart={didStart}
              changeSeconds={changeSeconds}
            />
          </div>
          <div className="col-sm">
            {(() => {
              if(error !== null){
                let errmessage1 = "";
                let errmessage2 = "";
                if(error.shower){
                  errmessage1 += "Shower already exists \n";
                }
                if(error.blank){
                  errmessage2 += "No capacity specified"
                }
            

                return (<div className="card bg-danger text-white mb-3">
                  <div className="card-body">
                    <h5 style={{
                      fontWeight: "bolder"
                    }}>{errmessage1}</h5>
                    <h5 style={{
                      fontWeight: "bolder"
                    }}>{errmessage2}</h5>
                  </div>
                </div>)
              }
            })()}
            <div className = "card mb-3 bg-primary text-white">
              <h4 className="card-body" style={{
                fontWeight: "bolder"
              }}>
                Preferred Unit: {db.multiplier.label}
              </h4>
            </div>
            <form className="card bg-primary text-white" onSubmit={onSubmit}>
              <div className="card-body">
                <TextBox
                    title={`Enter capacity(${db.multiplier.label})`}
                    onChange={(e) => {
                      changeCapacity(e.target.value);
                    }}
                    type="number"
                />
                <TextBox
                    title="Enter shower name"
                    onChange={(e) => {
                      changeName(e.target.value);
                    }}
                    type="text"
                />

                <input type="submit" className="btn btn-light" />
              </div>
              
            </form>
          </div>
        </div>
        <div
          style={{
            margin: "20px",
          }}
        />
      </div>
    </div>
  );
}

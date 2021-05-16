import {Stopwatch} from '../widgets/Stopwatch';
// import {TextBox} from '../widgets/textbox';
import {useState, useContext, useEffect} from 'react';
import {DBContext} from '../providers/firebasedbprovider';
import Select from 'react-select';



export function CreateBath(){
    const [seconds, changeSeconds] = useState(0)
    const [didStart, changeStart] = useState(false);
    const [name, changeName] = useState("");
    const [once, changeOnce] = useState(true);
    const [response, changeResponse] = useState();
    const [water, changeWater] = useState(0);
    const [rate, changeRate] = useState();
    const [error, changeError] = useState("")
    let db = useContext(DBContext)

    function round(num){
        return Math.round((num + Number.EPSILON) * 100) / 100
    }
    useEffect(() => {
        async function getData(){

                
            // }
            let data = db.data.showers
            changeResponse(data);
            changeOnce(false) 
        }
        if(once){
            // console.log(db.data)
            getData()
        }
        // console.log("Something changed")
        let tm;
        if(didStart){
            tm = setTimeout(() => {
                
                changeSeconds(round(seconds+0.1));
                // console.log(water)
                // console.log(water === NaN)
                changeWater(round(rate*seconds));
            }, 100)
        } 

        return () => {
            clearTimeout(tm)
        }

        
    }, [seconds, didStart, name, once, response, water, rate, db.data.showers])

    // async function onSubmit(event){
    //     event.preventDefault();
    // }

    async function changeNameWater(name){
        changeName(name)
        // consolelog(name)
        // let data = await db.getUserData('/showers/' + name['value'])

        let data = db.data.showers[name['value']]
        // console.log(db.data.showers[name['value']])
        changeRate(data['rate'])
        
    }

    async function onSubmit(event){
        event.preventDefault();

        try{
            // if(water === NaN){
            //     throw {'code': "Select a shower"}
            // } 
            if(water === 0){
                throw {'code': "You didn't start your shower yet???"}
            }
            if(name === ""){
                throw {'code': "Specify a shower!"}
            }
            
            let date = Date.now().toString()
            // console.log(date)
            if(db.data.goal === undefined){
                await db.writeUserData('records/' + date, {
                    'water': water,
                    'name': name['value'],
                    'pctGoal': 0
                });
            } else {
                let pctGoal = Math.round((water-db.data.goal)/water * 10000)/100
                await db.writeUserData('records/' + date, {
                    'water': water,
                    'name': name['value'],
                    'pctGoal': pctGoal
                });
            }

            let records = JSON.parse(JSON.stringify(db.data.records))
            let keys = Object.keys(db.data.records)
            
            let latest = records[keys[keys.length-1]].water
            // latest["date"] = keys[keys.length-1]
            // if(!db.goal === latest){
            
            console.log(latest - (3000 * db.multiplier.value))
            console.log(`${latest} - (300 * ${db.multiplier.value})`)
            if(latest - 3000 <= 0){
                await db.writeUserData('goal', latest);
            } else {
                await db.writeUserData('goal', latest-3000);
            }

            

            window.location = "/"
        } catch(e) {
            changeError(e.code)
        }
    }

    return(
        <div className="container d-flex" style={{
            minHeight:"100vh"
        }}>
            <div className="container-sm align-items-center align-self-center">

                    <div style={{
                        margin: "20px"
                    }}/>

                    <div className="card bg-primary" style={{
                        color:'white'
                    }}>


                        <div className="card-body">
                            <h1 className="page-header" style={{
                                fontWeight: 700
                            }}>
                                Track your Water Usage
                            </h1>
                            <p>To keep track of how much water you use during showering,
                                you need to give the rate at which the water flows in your
                                shower.
                            </p>

                            <h4>Instructions:</h4>
                            <ol>
                                <li>Select the shower that you are using.</li>
                                <li>Start your shower</li>
                                <li>Click the button to start the timer.</li>
                                <li>Start your showering. Be sure to pause the timer when your water is off</li>
                                <li>When you are finished showering, stop the timer</li>
                            </ol>
                        </div>
                    </div>
                    <div style={{
                        margin: "20px"
                    }}/>
                    <div className="card bg-primary text-white">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm">
                                    <h3 className="text-center" style={{
                                        fontWeight: 700
                                    }}>
                                        Water Used: {Number.isNaN(water) ? "Select a shower to see water usage" : round(water * db.multiplier.value) + db.multiplier.label}
                                    </h3>
                                </div>
                                <div className="col-sm">
                                    <h3 className="text-center" style={{
                                        fontWeight: 700
                                    }}>

                                        {
                                            db.data.goal === undefined ? "Is this your first shower? Goals will be set after your first.":
                                            round(db.data.goal * db.multiplier.value) + db.multiplier.label
                                            }
                                    </h3>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                    <div style={{
                        margin: "20px"
                    }}/>
                    <div className="row d-flex align-items-stretch">
                        <div className="col-sm">
                            <Stopwatch seconds={seconds} 
                                    changeStart={changeStart}
                                    didStart={didStart}
                                    changeSeconds={changeSeconds}/>
                        </div>
                        <div className="col-sm">
                            {/* <datalist id="datalistOptions">
                                {
                                    
                                    ? Object.keys(response).map((value) => <option key={value} value={value} />) : <h1></h1>
                                }
                            </datalist> */}
                            {(() => {
                                if(error !== ""){
                                    return  <div>
                                        <div className="card bg-danger m-2">
                                            <div className="card-body text-white">
                                                <h4 style={{
                                                    fontWeight: "bolder"
                                                }}>{error}</h4>
                                            </div>
                                        </div>
                                        <div style={{
                                            margin: "20px"
                                        }}/>
                                    </div>
                                }
                            })()}

                            <form className="card bg-primary" onSubmit = {onSubmit}>
                                {/* <TextBox title="Enter shower name" onChange={(e) => {
                                    changeName(e.target.value)
                                }} type="text" list="datalistOptions"/> */}
                                <div className="card-body">
                                    <div className="form-group">
                                        <h4 style={{
                                            color:"white"
                                        }}>Shower Name:</h4>
                                        <Select style={{
                                            color:"black"
                                        }} defaultValue={name} onChange={changeNameWater} options={ response !== undefined ? Object.keys(response).map((value) => {
                                            return {
                                                value: value,
                                                label: value
                                            }
                                        }) : []} />
                                    </div>
                                    <div style={{
                                        margin: "10px"
                                    }}/>
                                    <input type="submit" className="btn btn-light"/>
                                </div>
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
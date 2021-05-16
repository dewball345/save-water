// import "bootstrap/dist/css/bootstrap.min.css";
// import '../scss/custom.scss';


export function Stopwatch({ seconds, changeStart, didStart, changeSeconds }) {
    return (
        <div>
            <div className="card bg-primary" style={{
                // borderRadius: "10px",
                marginBottom: "10px",
                color:"white"
            }}>
                {/* <div className="card-header bg-primary" style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    color: "white"
                }}>
                    Timer
                </div> */}
                <div className="card-body">
                    <label htmlFor="cardinput">
                        <h3 style={{
                            fontWeight:"bolder"
                        }}>Timer</h3>
                    </label>

                    <h4 className="card-title">
                        Seconds:
                        <input type="number" step="any" min="0" id="cardinput" className="bg-secondary form-control border-0" value={
                            Number.isNaN(parseFloat(seconds)) ? "" : parseFloat(seconds)} style={{
                            fontSize: "20px",
                            fontWeight: "bolder",
                            color: "white"
                        }} onChange={(e) => {
                            changeSeconds(parseFloat(e.target.value))
                        }}/>
                        {/* {seconds} seconds */}
                    </h4>
                    <h5>
                        Edit the time if you need to.
                    </h5>
                    <div className="row">
                        <div className="col-md-auto">
                            <button className="btn btn-light" style={{
                                marginBottom: "10px",
                                color:"green"
                            }} onClick={() => {
                                changeStart(!didStart);
                            }}>
                                {didStart ? "Stop" : "Start"}
                            </button>
                        </div>

                        <div className="col-md-auto">

                            <button className="btn btn-light" style={{
                                color:"red",
                                fontWeight: "800"
                            }} onClick={() => {
                                changeSeconds(0);
                            }}>
                                Reset
                        </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

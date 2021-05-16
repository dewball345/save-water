import { useContext, useEffect, useState } from "react";
import { DBContext } from "../providers/firebasedbprovider";
import Select from "react-select";
import "../scss/custom.scss";

function MinMaxAverageCard({ bgColor, waterLevel, date, shower, title }) {
    return (
        <div
            className="card m-2 p-3 text-light"
            style={{
                backgroundColor: bgColor,
                minWidth: "150px",
            }}
        >
            <div className="card-body">
                <h5
                    style={{
                        fontWeight: "bolder",
                    }}
                >
                    {title}
                </h5>

                <p>
                    <span
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        Water Used:{" "}
                    </span>{" "}
                    {waterLevel}
                </p>

                <p>
                    <span
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        Date:{" "}
                    </span>{" "}
                    {date}
                </p>

                <p>
                    <span
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        Shower:{" "}
                    </span>{" "}
                    {shower}
                </p>
            </div>
        </div>
    );
}

function DeleteModal({ parsed, title, deleter }) {
    // console.log("DELETE MODAL")
    // console.log(parsed)
    // console.log(title)
    // console.log(deleter)
    // console.log("END")
    return (
        <div>
            <button
                className="btn"
                data-toggle="modal"
                data-target={"#" + parsed}
                style={{
                    color: "#FFBBBB",
                    fontWeight: "bolder",
                }}
                aria-label="Close"
            >
                <span aria-hidden="true">delete</span>
            </button>

            <div
                className="modal fade text-dark"
                id={parsed}
                tabIndex="-1"
                role="dialog"
                aria-labelledby={parsed}
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title text-primary"
                                id="exampleModalLabel"
                                aria-label="Delete?"
                                style={{
                                    fontWeight: "bolder",
                                }}
                            >
                                Delete "{title}"?
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close modal"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete "{title}"? This
                            cannot be undone.
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={deleter}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShowerTableEntry({ title, rate, deleter }) {
    let parsed = title.replace(/\W+/g, "");
    // console.log(parsed)
    return (
        <div className="border-bottom m-2 mb-2 border-secondary">
            <div
                className="text-white row d-flex justify-content-around align-items-center"
                style={
                    {
                        // backgroundColor: 'blue'
                    }
                }
            >
                <div
                    className="col-xs"
                    style={
                        {
                            // backgroundColor: 'blue'
                        }
                    }
                >
                    <h6
                        style={{
                            fontWeight: "bolder",
                            marginRight: "5px",
                        }}
                    >
                        {title}
                    </h6>
                </div>
                <div className="col-xs">
                    <h6>{rate}</h6>
                </div>
                
            </div>
            <DeleteModal parsed={parsed} title={title} deleter={deleter} />
            
        </div>
    );
}

function RecordTableEntry({ date, title, gallons, spanbadge, deleter }) {
    let mdate = new Date(parseInt(date));
    let parsed = "date" + date.replace(/\W+/g, "");
    // console.log("RECORD TABLE ENTRY")
    // console.log(parsed)
    // console.log(typeof date)
    // console.log(mdate.toLocaleString())
    // console.log("END")
    return (
        <div className="border-bottom mb-2 m-2 border-secondary">
            <div className="border-secondary text-white row d-flex justify-content-stretch align-items-center">
                <div
                    className="col-sm m-1 d-flex justify-content-center"
                    style={
                        {
                            // backgroundColor: 'blue'
                        }
                    }
                >
                    <h6
                        style={{
                            fontWeight: "bolder",
                        }}
                    >
                        {mdate.toLocaleString()}
                    </h6>
                </div>

                <div className="col-sm m-1 d-flex justify-content-center">
                    <h6
                        style={{
                            textAlign: "center",
                        }}
                    >
                        {title}
                    </h6>
                </div>

                <div
                    className="col-sm m-1 p-1 d-flex justify-content-center"
                    style={
                        {
                            // backgroundColor: "green"
                        }
                    }
                >
                    <h6
                        style={
                            {
                                // backgroundColor: "blue",
                                // textAlign: "end"
                            }
                        }
                    >
                        {gallons} <br /> {spanbadge}
                    </h6>
                    {/* <span className="badge badge-pill badge-danger">{pct}</span></h6> */}
                </div>
            </div>
            <DeleteModal
                parsed={parsed}
                title={mdate.toLocaleString()}
                deleter={deleter}
            />
        </div>
    );
}

//TODO: refactor like crazy
//TODO: dashboard for many other water devices(start with hoses, but make it adaptable)
export function Dashboard() {
    // const [test, changeTest] = useState(false);
    const db = useContext(DBContext);
    // const [multiplier, changeMultiplier] = useState({value: 1, label: " mL"})

    useEffect(() => {
        console.log("Entered");
    });
    const range = (start, end, length = end - start) =>
        Array.from({ length }, (_, i) => start + i);

    if (db.data === undefined || db.data === null) {
        return <div />;
    }

    // useEffect(() => {
    //     console.log(test)
    //     changeTest(true)
    // }, [test])
    function round(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }

    return (
        <div
            className="container d-flex justify-content-center"
            style={{
                minHeight: "100vh",
            }}
        >
            <div className="container-lg d-flex flex-column align-self-center text-center justify-content-center">
                {/* <h1 className="page-header border-bottom" style={{
                    fontWeight: 700
                }}>
                    Create Shower
                </h1> */}
                <h1
                    className="display-1 text-light"
                    style={{
                        fontWeight: "bolder",
                    }}
                >
                    Save Water.
                </h1>

                <h5
                    className="text-light"
                    style={{
                        marginTop: "-20px",
                        fontWeight: "bold",
                    }}
                >
                    Click "sync" in navbar to view changes from other devices
                </h5>

                <div
                    style={{
                        margin: "10px",
                    }}
                />

                <div
                    className="card bg-primary text-white"
                    style={{
                        marginLeft: "6vw",
                        marginRight: "6vw",
                    }}
                >
                    <div className="card-body">
                        <div
                            className="container-xs align-self-center"
                            style={{
                                // maxWidth: "500px",
                                // minWidth: "50vw",
                                fontWeight: "bolder",
                            }}
                        >
                            <label
                                style={{
                                    width: "40vw",
                                }}
                            >
                                <h2
                                    style={{
                                        fontWeight: "bolder",
                                    }}
                                >
                                    Preferred Unit:{" "}
                                </h2>
                                <Select
                                    className="text-dark"
                                    defaultValue={db.multiplier}
                                    options={db.options}
                                    onChange={db.changeMultiplier}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        margin: "10px",
                    }}
                />

                <div className="row">
                    <div className="col-sm">
                        {(() => {
                            console.log("HERE");
                            if (
                                db.data.goal === null ||
                                db.data.goal === undefined
                            ) {
                                // return (<h4>
                                //     Looks like you haven't set up a goal.
                                //     Go to the 'track water usage' tab to get
                                //     your personal goal
                                // </h4>)
                                console.log("here");
                                return;
                            }

                            let records = JSON.parse(
                                JSON.stringify(db.data.records)
                            );
                            let keys = Object.keys(db.data.records);

                            let latest = records[keys[keys.length - 1]];
                            latest["date"] = keys[keys.length - 1];

                            if (latest["water"] > 64352) {
                                return (
                                    <div className="card bg-danger text-white text-left p-3">
                                        <h1
                                            className="m-2"
                                            style={{
                                                fontWeight: "bolder",
                                            }}
                                        >
                                            Hello there,
                                        </h1>
                                        <h2
                                            className="m-2"
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            You are using more water than the
                                            average person in the United
                                            States(17 gallons). Water is the
                                            most important natural resouce we
                                            have, and we can't have people like
                                            you waste it. I know this may be
                                            hard, but try to use less water.
                                        </h2>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="card bg-success text-white text-left p-3">
                                        <h1
                                            className="m-2"
                                            style={{
                                                fontWeight: "bolder",
                                            }}
                                        >
                                            Hello there,
                                        </h1>
                                        <h2
                                            className="m-2"
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            You are using less water than the
                                            average person in the United States.
                                            Keep up your good work! People like
                                            you who conserve resources care, so
                                            good job! 👍
                                        </h2>
                                    </div>
                                );
                            }
                        })()}
                        <div
                            style={{
                                margin: "20px",
                            }}
                        />
                        <div
                            className="card bg-primary"
                            style={{
                                color: "white",
                            }}
                        >
                            <div className="card-body text-center">
                                {(function totalText() {
                                    if (
                                        db.data.records === undefined ||
                                        db.data.records == null
                                    ) {
                                        return (
                                            <h4>
                                                Looks like you haven't started a
                                                shower. Click the "track water
                                                usage" icon to start!
                                            </h4>
                                        );
                                    }
                                    let total = 0;
                                    let keys = Object.keys(db.data.records);

                                    keys.forEach((key) => {
                                        total += db.data.records[key].water;
                                    });

                                    return (
                                        <h2
                                            className="p-2"
                                            style={{
                                                fontWeight: "bolder",
                                            }}
                                        >
                                            Total:{" "}
                                            {round(total * db.multiplier.value)}{" "}
                                            {db.multiplier.label}
                                        </h2>
                                    );
                                })()}
                            </div>
                        </div>
                        <div
                            style={{
                                margin: "20px",
                            }}
                        />
                        <div
                            className="card bg-primary"
                            style={{
                                color: "white",
                            }}
                        >
                            <div className="card-body text-center">
                                {(function goalText() {
                                    if (
                                        db.data.goal === null ||
                                        db.data.goal === undefined
                                    ) {
                                        return (
                                            <h4>
                                                Looks like you haven't set up a
                                                goal. Go to the 'track water
                                                usage' tab to get your personal
                                                goal
                                            </h4>
                                        );
                                    }
                                    return (
                                        <h2
                                            className="p-2"
                                            style={{
                                                fontWeight: "bolder",
                                            }}
                                        >
                                            Get less than{" "}
                                            {round(
                                                db.data.goal *
                                                    db.multiplier.value
                                            )}{" "}
                                            {db.multiplier.label}
                                        </h2>
                                    );
                                })()}
                            </div>
                        </div>
                        <div
                            style={{
                                margin: "20px",
                            }}
                        />
                        <div
                            className="card bg-primary"
                            style={{
                                color: "white",
                            }}
                        >
                            <div className="card-body text-center">
                                <h3
                                    className="p-2"
                                    style={{
                                        fontWeight: "bolder",
                                    }}
                                >
                                    Water usages
                                </h3>
                                <div
                                    style={{
                                        maxHeight: "600px",
                                        overflowY: "auto",
                                        overflowX: "hidden",
                                    }}
                                >
                                    {(() => {
                                        if (
                                            db.data.records === undefined ||
                                            db.data.records === null
                                        ) {
                                            return (
                                                <div className="m-2">
                                                    Looks like you haven't
                                                    started a shower yet! If you
                                                    want to see something here,
                                                    click "track water usage" in
                                                    the navbar
                                                </div>
                                            );
                                        }

                                        return Object.keys(db.data.records).map(
                                            (val) => {
                                                let spanbadge;
                                                // console.log(db.data.records[val].pctGoal === undefined)
                                                if (
                                                    db.data.records[val]
                                                        .pctGoal ===
                                                        undefined ||
                                                    db.data.records[val]
                                                        .pctGoal === NaN
                                                ) {
                                                    spanbadge = (
                                                        <span className="badge badge-pill badge-warning">
                                                            NaN
                                                        </span>
                                                    );
                                                } else if (
                                                    db.data.records[val]
                                                        .pctGoal < 0
                                                ) {
                                                    spanbadge = (
                                                        <span className="badge badge-pill badge-success">
                                                            {
                                                                db.data.records[
                                                                    val
                                                                ].pctGoal
                                                            }
                                                            %
                                                        </span>
                                                    );
                                                } else if (
                                                    db.data.records[val]
                                                        .pctGoal === 0
                                                ) {
                                                    spanbadge = (
                                                        <span className="badge badge-pill badge-light">
                                                            {
                                                                db.data.records[
                                                                    val
                                                                ].pctGoal
                                                            }
                                                            %
                                                        </span>
                                                    );
                                                } else {
                                                    spanbadge = (
                                                        <span className="badge badge-pill badge-danger">
                                                            +
                                                            {
                                                                db.data.records[
                                                                    val
                                                                ].pctGoal
                                                            }
                                                            %
                                                        </span>
                                                    );
                                                }

                                                return (
                                                    <RecordTableEntry
                                                        date={val}
                                                        key={val}
                                                        title={
                                                            db.data.records[val]
                                                                .name
                                                        }
                                                        gallons={
                                                            round(
                                                                db.data.records[
                                                                    val
                                                                ].water *
                                                                    db
                                                                        .multiplier
                                                                        .value
                                                            ) +
                                                            db.multiplier.label
                                                        }
                                                        spanbadge={spanbadge}
                                                        deleter={async () => {
                                                            await db.deleteUserData(
                                                                "records/" + val
                                                            );
                                                            let records = JSON.parse(
                                                                JSON.stringify(
                                                                    db.data
                                                                        .records
                                                                )
                                                            );
                                                            let keys = Object.keys(
                                                                db.data.records
                                                            );

                                                            let latest =
                                                                records[
                                                                    keys[
                                                                        keys.length -
                                                                            1
                                                                    ]
                                                                ].water;
                                                            // latest["date"] = keys[keys.length-1]
                                                            // if(!db.goal === latest){

                                                            if (
                                                                latest - 3000 <=
                                                                0
                                                            ) {
                                                                await db.writeUserData(
                                                                    "goal",
                                                                    latest
                                                                );
                                                            } else {
                                                                await db.writeUserData(
                                                                    "goal",
                                                                    latest -
                                                                        3000
                                                                );
                                                            }
                                                        }}
                                                    />
                                                );
                                            }
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div
                            style={{
                                margin: "20px",
                            }}
                        />
                        <div
                            className="card bg-primary"
                            style={{
                                color: "white",
                            }}
                        >
                            <div className="card-body text-center">
                                <h3
                                    className="p-2"
                                    style={{
                                        fontWeight: "bolder",
                                    }}
                                >
                                    List of showers
                                </h3>
                                <div
                                    style={{
                                        maxHeight: "300px",
                                        overflowY: "auto",
                                        overflowX: "hidden",
                                    }}
                                >
                                    {db.data.showers === undefined ||
                                    db.data.showers === null ? (
                                        <div>
                                            Looks like you haven't set up any
                                            shower, yet! Click the "add a
                                            shower" button in the nav menu to do
                                            so.
                                        </div>
                                    ) : (
                                        Object.keys(db.data.showers).map(
                                            (val) => {
                                                return (
                                                    <ShowerTableEntry
                                                        title={
                                                            db.data.showers[val]
                                                                .name
                                                        }
                                                        key={
                                                            db.data.showers[val]
                                                                .name
                                                        }
                                                        rate={
                                                            round(
                                                                db.data.showers[
                                                                    val
                                                                ].rate *
                                                                    db
                                                                        .multiplier
                                                                        .value
                                                            ) +
                                                            db.multiplier
                                                                .label +
                                                            "/sec"
                                                        }
                                                        deleter={async () => {
                                                            await db.deleteUserData(
                                                                "showers/" +
                                                                    db.data
                                                                        .showers[
                                                                        val
                                                                    ].name
                                                            );
                                                        }}
                                                    />
                                                );
                                            }
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                margin: "20px",
                            }}
                        />
                        <div
                            className="card text-center bg-primary"
                            style={{
                                color: "white",
                            }}
                        >
                            <div className="card-body">
                                <h3
                                    style={{
                                        fontWeight: "bolder",
                                    }}
                                >
                                    Some more data.
                                </h3>
                                <div
                                    style={{
                                        margin: "20px",
                                    }}
                                />

                                {(() => {
                                    if (
                                        db.data.records === undefined ||
                                        db.data.records === null
                                    ) {
                                        return (
                                            <div>
                                                Looks like you haven't started a
                                                shower yet! If you want to see
                                                something here, click "track
                                                water usage" in the navbar
                                            </div>
                                        );
                                    }

                                    let records = JSON.parse(
                                        JSON.stringify(db.data.records)
                                    );
                                    let keys = Object.keys(db.data.records);

                                    let latest = records[keys[keys.length - 1]];
                                    latest["date"] = keys[keys.length - 1];

                                    // console.log(latest.water - (3000 * db.multiplier.value))
                                    // console.log(`${latest.water} - 3000 * ${db.multiplier.value}`)
                                    
                                    let first = records[keys[0]];
                                    first["date"] = keys[0];

                                    let pctChange =
                                        (latest.water - first.water) /
                                        first.water;
                                    // console.log("(" + latest.water + "-" + first.water + ") / "  + first.water)
                                    let bgColor = "white";

                                    if (pctChange < 0) {
                                        pctChange =
                                            round(pctChange) * 100 +
                                            "% decrease from start";
                                        bgColor = "#bbffbb";
                                    } else if (pctChange === 0) {
                                        pctChange = "No change from start";
                                    } else {
                                        pctChange =
                                            round(pctChange) * 100 +
                                            "% increase from start";
                                        bgColor = "#ffbbbb";
                                    }

                                    let min;
                                    let max;

                                    let arr = keys.map((key) => {
                                        records = JSON.parse(
                                            JSON.stringify(db.data.records)
                                        );

                                        if (min === undefined) {
                                            min = records[key];
                                            min["date"] = key;
                                        } else if (
                                            records[key].water < min.water
                                        ) {
                                            min = records[key];
                                            min["date"] = key;
                                        }

                                        if (max === undefined) {
                                            max = records[key];
                                            max["date"] = key;
                                        } else if (
                                            records[key].water > max.water
                                        ) {
                                            max = records[key];
                                            max["date"] = key;
                                        }
                                    });

                                    // console.log(latest);
                                    // console.log(min);
                                    // console.log(max);

                                    return [
                                        <h5
                                            key="0"
                                            style={{
                                                color: bgColor,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {pctChange}
                                        </h5>,
                                        <h5
                                            key="1"
                                            style={{
                                                color:
                                                    latest.pctGoal < 0
                                                        ? "#bbffbb"
                                                        : "#ffbbbb",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {latest.pctGoal}% of goal
                                        </h5>,
                                        <div
                                            key="2"
                                            className="row"
                                            style={{
                                                maxHeight: "1000px",
                                                overflow: "scroll",
                                            }}
                                        >
                                            <div className="col-sm">
                                                <MinMaxAverageCard
                                                    bgColor="#495ea3"
                                                    waterLevel={
                                                        round(
                                                            first.water *
                                                                db.multiplier
                                                                    .value
                                                        ) + db.multiplier.label
                                                    }
                                                    date={new Date(
                                                        parseInt(first.date)
                                                    ).toLocaleString()}
                                                    shower={first.name}
                                                    title="First Usage"
                                                />
                                            </div>
                                            <div className="col-sm">
                                                <MinMaxAverageCard
                                                    bgColor="#495ea3"
                                                    waterLevel={
                                                        round(
                                                            latest.water *
                                                                db.multiplier
                                                                    .value
                                                        ) + db.multiplier.label
                                                    }
                                                    date={new Date(
                                                        parseInt(latest.date)
                                                    ).toLocaleString()}
                                                    shower={latest.name}
                                                    title="Latest Usage"
                                                />
                                            </div>
                                            <div className="col-sm">
                                                <MinMaxAverageCard
                                                    bgColor="#09794c"
                                                    waterLevel={
                                                        round(
                                                            min.water *
                                                                db.multiplier
                                                                    .value
                                                        ) + db.multiplier.label
                                                    }
                                                    date={new Date(
                                                        parseInt(min.date)
                                                    ).toLocaleString()}
                                                    shower={min.name}
                                                    title="Minimum Usage"
                                                />
                                            </div>

                                            <div className="col-sm">
                                                <MinMaxAverageCard
                                                    bgColor="#a30e7e"
                                                    waterLevel={
                                                        round(
                                                            max.water *
                                                                db.multiplier
                                                                    .value
                                                        ) + db.multiplier.label
                                                    }
                                                    date={new Date(
                                                        parseInt(max.date)
                                                    ).toLocaleString()}
                                                    shower={max.name}
                                                    title="Maximum Usage"
                                                />
                                            </div>
                                        </div>,
                                    ];
                                })()}
                            </div>
                        </div>
                        <div
                            style={{
                                margin: "20px",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
        // </div>
    );
}

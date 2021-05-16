import logo from '../assets/favicon-32x32.png';

function WaterUsageWidget(){
    return (
        <div className="card bg-primary text-white mb-2">
            <div className="card-body">
                <div className="row">
                    <div className="col-3">
                        <h1 className="display-1 text-center" style={{
                            fontWeight: "bolder"
                        }}>
                            17
                        </h1>
                    </div>
                    <div className="col-9">
                        <h3>
                            is the number of gallons an average american uses per shower. That's a lot!
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
function IntroWidget(){
    return (
        <div className="card mb-2 bg-primary text-white">
            <div className="card-body text-left">
                <div className="col-sm">
                    <h1 className="display-4" style={{
                        fontWeight: "bolder"
                    }}>
                        What is "Save Water"?
                    </h1>
                    <h3>
                        "Save Water" tracks your usage during showering to help you save water. 
                        This app also sets goals for you, to help lower your water usage.
                    </h3>
                </div>
                
            </div>
        </div>
    )
}

export function Info(){
    return (
    <div className="container d-flex align-self-center justify-content-center" style={{
        minHeight:"100vh"
    }}>
        <div className="container-sm align-self-center">
            <div className="card bg-primary text-white">
                <div className="card-body">
                    <h1 style={{fontWeight:"bolder"}}>Let's Save Water!</h1>
                    <h5 style={{fontWeight:"bold"}}>
                        I remember in kindergarten or first grade, listening to my teachers 
                        talking about a word I had never heard before: a drought. At the time 
                        I didn’t realize it, but California was entering a five-year drought 
                        period that started in 2012 and ended in 2016. During those 5 years, 
                        especially in the beginning, I would look at a flask outside our elementary
                        school classroom and see how much water filled up; not much, 
                        to be honest. So I thought to myself: what is it that we are 
                        doing that is making the situation worse.
                        <div style={{"margin":"20px"}}></div>
                        I realized that one of the biggest contributors to water wastage 
                        is the shower; The average American uses 17 gallons per shower, 
                        which adds up, considering the average person bathes one to 
                        two times a day. I realized I had to find a way to reduce this number.
                        <div style={{"margin":"20px"}}></div>
                        This app is a solution to the problem mentioned above; 
                        By using the shower flow rate and the time for showering, 
                        Save Water calculates the amount of water one uses per shower. 
                        The app then gives personalized feedback and reasonable goals 
                        to help reduce this amount. The dashboard provides a bunch of 
                        statistics about your water usage when showering, all to encourage 
                        you to use less. When using this app I reduced my water usage 
                        from around 15 gallons to 10. 
                        <div style={{"margin":"20px"}}></div>
                        The app is free, and should work offline as well; 
                        so expect it to work during trips abroad and in the 
                        comfort of your own home. Users can set multiple showers, 
                        and edit and delete them as well. You can see the percent 
                        increase and decrease from your expected usage.
                        <div style={{"margin":"20px"}}></div>
                        So what are you waiting for? Add the app to your home screen and 
                        click the register button in the navbar to get started!
                    </h5>
                    <div style={{"margin":"20px"}}></div>
                    <h6>
                        This beautiful font is called Leauge Spartan. 
                        You can download and use it at: https://www.theleagueofmoveabletype.com/league-spartan
                        This favicon was generated using the following graphics from Twitter Twemoji:
                        Graphics Title: 1f6bf.svg
                        Graphics Author: Copyright 2020 Twitter, Inc and other contributors (https://github.com/twitter/twemoji)
                        Graphics Source: https://github.com/twitter/twemoji/blob/master/assets/svg/1f6bf.svg
                        Graphics License: CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
                    </h6> 
                </div>        
            </div>
        </div>
    </div>)
}
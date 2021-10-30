import React from "react";
import Firebase from "firebase";
import config from "./config";
import Gauge from 'react-svg-gauge';

class ChartX extends React.Component {
  constructor(props) {
    super(props);
    if (!Firebase.apps.length) {
       Firebase.initializeApp(config);
    }else {
       Firebase.app(); // if already initialized, use that one
    }

    this.state = {
      humidity : 0,
      pressure : 0,
      temperature: 0
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
	let ref = Firebase.database().ref("/meteoarchive3_current/");
	ref.on('value', (snapshot) => {
	  const state = snapshot.val();
	  this.setState(state);
	 });
  };

  render(){
    const style = { color: 'black', fontSize: 24, 'text-align': 'center' };
    return (
      <React.Fragment>  
      <div style={style} className="container">
  		  <h3>Meteo Current Results at {this.state.time}</h3>
          <Gauge value={this.state.temperature} width={160} height={120} min="-20" max="50" label="Temperature (°C)" /><br/>
          <Gauge value={this.state.relhumidity} width={160} height={120} label="Rel. Humidity (%)" />
          <Gauge value={this.state.atmpressure} width={160} height={120} min="900" max="1100" label="Atm. pressure (mBar)" />
  		</div>
      </React.Fragment>
    );
  }
}

export default ChartX;

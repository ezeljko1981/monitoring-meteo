import React from "react";
import Firebase from "firebase";
import config from "./config";
import {Line} from 'react-chartjs-2';

var stateGP = null;
var aData = [];
var aTimes = [];

class ChartP extends React.Component {
  constructor(props) {
    super(props);
    if (!Firebase.apps.length) {
       Firebase.initializeApp(config);
    }else {
       Firebase.app();
    }
    this.state = null;
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
  let ref = Firebase.database().ref("/meteoarchive3/");
	ref.on('value', (snapshot) => {
	  const state = snapshot.val();
    this.setState(state);
    setTimeout(() => {
        this.fillGraph()
      }, 1);
	  });
  }

  fillGraph = () =>{
      setTimeout(() => {
      var jsonData = JSON.parse(JSON.stringify(this.state));
      aData = [];
      aTimes = [];
      for(let x in jsonData){
        aData[x] = jsonData[x].atmpressure;
        aTimes[x] = jsonData[x].time + "[" + jsonData[x].dayofweek + "]";
      }

      stateGP = {
        labels: aTimes,
        datasets: [
          {
            label: 'Atmospheric pressure (mBar)',
            fill: true,
            lineTension: 0.2,
            backgroundColor: 'rgba(175,192,192,1)',
            borderColor: 'rgba(255,0,0,1)',
            borderWidth: 2,
            data: aData
          }
          ]
        }
      }, 1);
  }

  render(){
    return (
      <React.Fragment>
      <div>
        {stateGP === null && <p>Press Home to load history of<br/>atmospheric pressure</p>}
        <div>
          <Line
            data={stateGP}
            options={{
              title:{
                display:true,
                text:'Average atmospheric pressure in mBar',
                fontSize:30
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default ChartP;

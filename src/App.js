import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Graphs, ChartT, ChartH, ChartP, Reports } from "./components";
import './App.css';
import './Style.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Graphs />} />
            <Route path="/chartt" exact component={() => <ChartT />} />
            <Route path="/charth" exact component={() => <ChartH />} />
            <Route path="/chartp" exact component={() => <ChartP />} />
            <Route path="/reports" exact component={() => <Reports />} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;

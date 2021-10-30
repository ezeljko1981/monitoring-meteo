import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  const style = { color: 'black', fontSize: 24, 'text-align': 'center' };
  return (
    <div className="navigation">
      <nav class="navbar navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            <h3 style={style} >Home</h3>
          </Link>
          <Link class="navbar-brand" to="/chartt">
            <h3 style={style} >Temperature</h3>
          </Link>
          <Link class="navbar-brand" to="/charth">
            <h3 style={style} >Rel. humidity</h3>
          </Link>
          <Link class="navbar-brand" to="/chartp">
            <h3 style={style} >Atm. pressure</h3>
          </Link>
          <Link class="navbar-brand" to="/reports">
            <h3 style={style} >Reports</h3>
          </Link>
          <br/>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);

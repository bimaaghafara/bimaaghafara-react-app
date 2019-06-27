import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages
import { ChartExample } from './modules/chart-example';
import { BankAccount } from './modules/bank-account';

// 3rd lib
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Home = () => (
  <div id="page-home">
    <h4>Wellcome to the app!</h4>
  </div>
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenu: 'home'
        };
    }
    render() {
      
      const Menu = ({ menu }) => (
        <li style={{'paddingTop': '8px'}}>
          <Link 
            to={menu.link}
            onClick={() => {
              this.setState({activeMenu: menu.key}
            )}}
            className={'nav btn btn-' + (this.state.activeMenu===menu.key? 'success' : 'default')}
            >{menu.label}</Link>
        </li>
      );
      
      return (
        <Router>
          <div style={{'padding': '25px 50px'}}>
            <h4>Please Select One Menu:</h4>
            <ul>
              <Menu menu={{key:"home", label:"Home", link:"/"}}/>
              <Menu menu={{key:"bank-account", label:"Bank Account", link:"/bank-account"}}/>
              <Menu menu={{key:"chart-example", label:"Chart Example", link:"/chart-example"}}/>
            </ul>
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/chart-example" component={ChartExample} />
            <Route path="/bank-account" component={BankAccount} />
          </div>
        </Router>
      );
    }
}
  

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

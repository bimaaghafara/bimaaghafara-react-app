import React, { Component } from 'react';

// pages
import {BankAccountFormPage} from './bank-account-form.page';
import { BankAccountListPage } from './bank-account-list.page';
// 3rd library
import { Route, Link } from "react-router-dom";

export class BankAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: ''
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
      <div id="Page-BankAccount">
        <h4>BankAccount</h4>
        <ul>
            <Menu menu={{key:"add", label:"Add", link:`${this.props.match.url}/add`}}/>
            <Menu menu={{key:"list", label:"List", link:`${this.props.match.url}/list`}}/>
        </ul>

        <hr></hr>

        <Route
          exact path={`${this.props.match.url}`} 
          render={(props) => (
            <BankAccountListPage actionType='list' parentProps={props}/>
          )}
        />
        <Route
          path={`${this.props.match.url}/list`}
          render={(props) => (
            <BankAccountListPage actionType='list' parentProps={props}/>
          )}
        />
        <Route
          path={`${this.props.match.url}/add`}
          render={(props) => (
            <BankAccountFormPage actionType='add' parentProps={props}/>
          )}
        />
        <Route
          path={`${this.props.match.url}/view/:id`}
          render={(props) => (
            <BankAccountFormPage actionType='view' id={props.match.params.id} parentProps={props}/>
          )}
        />
        <Route
          path={`${this.props.match.url}/edit/:id`}
          render={(props) => (
            <BankAccountFormPage  actionType='edit' id={props.match.params.id} parentProps={props}/>
          )}
        />
      </div>
    );
  }
}

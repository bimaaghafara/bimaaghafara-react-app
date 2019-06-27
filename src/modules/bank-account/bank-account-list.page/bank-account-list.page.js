import React, { Component } from 'react';
import { bankAccountService } from '../bank-account.service';

export class BankAccountListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : []
    };
  }
  
  columns = [
    {key: 'id', label: 'Id'},
    {key: 'accountHolderName', label: 'Account Holder Name'},
    {key: 'accountNumber', label: 'Account Number'},
    {key: 'swiftCode', label: 'Swift Code'},
    {key: 'address', label: 'Address'},
    {key: 'city', label: 'City'},
    {key: 'country', label: 'Country'},
    {key: 'currency', label: 'Currency'},
    {key: 'type', label: 'Type'},
    {key: 'firstName', label: 'First Name'},
    {key: 'lastName', label: 'Last Name'},
    {key: 'companyName', label: 'Company Name'}
  ]

  goToPage(link) {
    this.props.parentProps.history.push(link);
  }

  deleteBankAccount(id) {
    let isConfirmed = window.confirm(`Are you sure to delete account with id ${id}?`);
    if (isConfirmed === true) {
      bankAccountService.deleteBankAccount(id)
    }
    this.setState({data: bankAccountService.getBankAccounts()});
  }

  componentWillMount() {
    this.setState({data: bankAccountService.getBankAccounts()});
  }

  render() {
    return (
      <div id="Page-BankAccountListPage" style={{'overflow': 'auto'}}>
        <table className="table table-hover" style={{'minWidth': '1100px'}}>
          <thead>
            <tr>
              <th style={{'minWidth': '80px'}}></th>
              {this.columns.map(column => 
                <th key={column.key}>{column.label}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((rowData, index) => 
              <tr key={index}>
                <td>
                  <span title="View" className="glyphicon glyphicon-align-left" style={{'marginRight': '10px', 'cursor': 'pointer'}}
                    onClick={() => {
                      this.goToPage(`/bank-account/view/${rowData.id}`)
                  }}/>
                  <span title="Edit" className="glyphicon glyphicon-edit" style={{'marginRight': '10px', 'cursor': 'pointer'}}
                    onClick={() => {
                      this.goToPage(`/bank-account/edit/${rowData.id}`)
                  }}/>
                  <span title="Delete" className="glyphicon glyphicon-trash"style={{'cursor': 'pointer'}} onClick={() => {
                    this.deleteBankAccount(rowData.id)
                  }}/>
                </td>
                {this.columns.map(column => 
                  <td key={column.key}>{rowData[column.key]}</td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
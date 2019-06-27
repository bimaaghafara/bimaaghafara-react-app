import React, { Component } from 'react';
import { bankAccountService } from '../bank-account.service';
import axios from 'axios';

export class BankAccountFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      accountHolderName: '',
      accountNumber: '',
      swiftCode: '',
      address: '',
      city: '',
      country: '',
      currency: '',
      type: '',
      firstName: '',
      lastName: '',
      companyName: '',
      countries: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  isViewMode = this.props.actionType === 'view';
  isEditMode = this.props.actionType === 'edit';
  isAddMode = this.props.actionType === 'add';

  handleSubmit(event) {
    let payload = {};
    this.columns.forEach(column => payload[column.key] = this.state[column.key]);
    if (this.isAddMode) {
      bankAccountService.addBankAccount(payload);
    } else {
      bankAccountService.editBankAccount(payload);
    }
    this.props.parentProps.history.push('/bank-account');
  } 

  handleInputChange(event) {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({[id]: value}, () => {
      if (id === 'type') {
        this.setState({firstName: '', lastName: '', companyName: ''})
      }
    });
  }

  InputText(input) {
    return (
      <div className="form-group col-md-6">
        <label>{input.label}</label>
        { input.isReadOnly
          ? <div>- {this.state[input.id]}</div>
          : <input type="text" className="form-control" id={input.id} value={this.state[input.id]} onChange={this.handleInputChange}></input> 
        }
      </div>
    );
  }

  InputNumber(input) {
    return (
      <div className="form-group col-md-6">
        <label>{input.label}</label>
        { input.isReadOnly
          ? <div>- {this.state[input.id]}</div>
          : <input type="number" min={input.min} className="form-control" id={input.id} value={this.state[input.id]} onChange={this.handleInputChange}></input>
        }
      </div>
    );
  }

  InputSelect(input) {
    const options = input.options || [];
    return (
      <div className="form-group col-md-6">
        <label>{input.label}</label>
        { input.isReadOnly
          ? <div>- {(options.find(el => el.value === this.state[input.id]) || {}).label}</div>
          : <select className="form-control" id={input.id} value={this.state[input.id]} onChange={this.handleInputChange}>
              <option value="">Select an option</option>
              { options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>{option.label}</option>
                );
              })}
            </select>
        }
      </div>
    );
  }

  componentWillMount() {
    const bankAccount = bankAccountService.getBankAccount(this.props.id);
    this.columns.forEach(column => {
      this.setState({[column.key]: bankAccount[column.key]});
    });

    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      const countries = res.data.map(el => {
        return {id: el.alpha3Code, name: el.name, currencies: el.currencies}
      });
      this.setState({countries: countries});
    });
  }

  render() {

    return (
      <div id="Page-BankAccountFormPage">

        <form>
          {this.InputText({id:'accountHolderName', label: 'Account Holder Name', isReadOnly: this.isViewMode})}
          {this.InputNumber({id:'accountNumber', label:'Account Number', min:'0', isReadOnly: this.isViewMode})}
          {this.InputText({id:'swiftCode', label: 'Swift Code', isReadOnly: this.isViewMode})}
          {this.InputText({id:'address', label: 'Address', isReadOnly: this.isViewMode})}
          {this.InputText({id:'city', label: 'City', isReadOnly: this.isViewMode})}

          {this.InputSelect({id: 'country', label: 'Country',
            options: this.state.countries.map(country => {
              return {value: country.id, label: country.name}
            }),
          isReadOnly: this.isViewMode})}

          {this.InputSelect({id: 'currency', label: 'Currency',
            options: (this.state.countries.find(country => country.id === this.state.country) || {currencies: []}).currencies.map(currency => {
              return {value: currency.code, label :`${currency.name} - ${currency.symbol}`}
            }),
          isReadOnly: this.isViewMode})}

          {this.InputSelect({id: 'type', label: 'Type', options: [
              {value:'individual', label:'Individual'},
              {value:'company', label:'Company'} 
          ], isReadOnly: this.isViewMode})}

          {this.state.type === "individual" &&
            <div>
              {this.InputText({id:'firstName', label: 'First Name', isReadOnly: this.isViewMode})}
              {this.InputText({id:'lastName', label: 'Last Name', isReadOnly: this.isViewMode})}
            </div>
          }

          {this.state.type === "company" &&
            <div>
              {this.InputText({id:'companyName', label: 'Company Name', isReadOnly: this.isViewMode})}
            </div>
          }
          
          <div className="form-group col-md-12" style={{'marginTop': '16px'}}>
            {!this.isViewMode &&
              <button type="button" className="btn btn-info pull-left" style={{'marginRight': '16px'}} onClick={this.handleSubmit}>Submit</button>
            }
            <button type="button" className="btn btn-default pull-left" style={{'marginRight': '16px'}} onClick={() => {this.props.parentProps.history.push('/bank-account');}}>Cancel</button>
          </div>
        </form>

      </div>
    );
  }
}
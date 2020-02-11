import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import { without, findIndex } from 'lodash';

class App extends Component{

  constructor() {
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 'Asc',
      queryText: '',
    }

    this.deleteAppointments = this.deleteAppointments.bind(this);
    this.toogleForm = this.toogleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentDidMount(){
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
      const apts = result.map(item => {
        item.aptId = this.state.lastIndex;
        this.setState({
          lastIndex: this.state.lastIndex +1
        })
        return item;
      })
      this.setState({
        myAppointments: apts
      });
    });

  }

  deleteAppointments(apt){
    let tempsApts = this.state.appointments;
    tempsApts = without(tempsApts, atp);

    this.setState({
      myAppointments: tempsApts
    })

  }

  toogleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  updateInfo(name, value, id){
    let tempsApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {
      aptId: id
    });

    tempsApts[aptIndex][name] = value;
    this.setState({
      myAppointments: tempsApts
    })
  }

  addAppointment(apt){
    let tempsApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempsApts.unshift(apt);
    this.setState({
      myAppointments: tempsApts,
      lastIndex: this.state.lastIndex +1
    });
  }

  changeOrder(order, direction){
    this.setState({
      orderBy: order,
      orderDir: direction
    })
  }

  searchApts(query) {
    this.setState({
      queryText: query
    })
  }

  render() {

    let order;
    let filteredApts = this.state.myAppointments;
    
    if(this.state.orderDir === 'asc'){
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts.sort((a,b) => {
      if (a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()){
        reurn -1 * order;
      } else {
        return 1 * order;
      }
    }).filter(eachItem => {
      return (
        eachItem['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
      )
    });

    return (
      <main class="page bg-white" id="petratings">
        <div class="container">
          <div class="row">
            <div class="col-md-12 bg-white">
              <div class="container">
                <AddAppointments  formDisplay={this.state.formDisplay} 
                toogleForm={this.toogleForm}
                AddAppointment = {this.AddAppointment}
                />
                <ListAppointments appointments={filteredApts} deleteAppointments={this.deleteAppointments} updateInfo={this.updateInfo}/>
                <SearchAppointments orderBy={this.state.orderBy} orderDir={this.state.orderDir} changeOrder={this.changeOrder} searchApts={this.searchApts}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;

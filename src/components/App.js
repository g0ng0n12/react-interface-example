import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import { without } from 'lodash';

class App extends Component{

  constructor() {
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDisplay: false,
    }
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

    this.deleteAppointments = this.deleteAppointments.bind(this);
    this.toogleForm = this.toogleForm.bind(this);
  }

  toogleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  render() {


    return (
      <main class="page bg-white" id="petratings">
        <div class="container">
          <div class="row">
            <div class="col-md-12 bg-white">
              <div class="container">
                <AddAppointments  formDisplay={this.state.formDisplay} 
                toogleForm={this.toogleForm}
                />
                <ListAppointments appointments={this.state.myAppointments} deleteAppointments={this.deleteAppointments}/>
                <SearchAppointments />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;

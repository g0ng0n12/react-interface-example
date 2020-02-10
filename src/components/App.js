import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';

class App extends Component{

  constructor() {
    super();
    this.state = {
      myAppointments: []
    }
  }

  componentDidMount(){
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
      const apts = result.map(item => {
        return item;
      })
      this.setState({
        myAppointments: apts
      });
    });

  }

  render() {


    return (
      <main class="page bg-white" id="petratings">
        <div class="container">
          <div class="row">
            <div class="col-md-12 bg-white">
              <div class="container">
                <AddAppointments  />
                <ListAppointments appointments={this.state.myAppointments}/>
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

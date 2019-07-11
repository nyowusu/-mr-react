import React, {Component} from 'react';
import {CardList} from './components/card-list/card-list.component';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({monsters: users}))
      .catch(error => console.log("I have errored"));
  }

  componentDidUpdate() {
    console.log(this.state.searchField);
  }

  filterMonsters = () => {
    this.state.monsters.filter(monster => {
        return monster.name.includes(this.state.searchField);
    });
  }

  handleChange = (e) => {
    this.setState({searchField: e.target.value})
  } 

  render () {

    const {monsters, searchField} = this.state;

    const filteredMonsters = searchField ? 
                            this.state.monsters.filter(
                                  monster => monster.name.toLowerCase().includes(searchField.toLowerCase()))
                            : monsters 
    
    return (
      <div className="App">
        <input 
              type='text' 
              placeholder="search monsters" 
              onChange={this.handleChange}/>
        <CardList monsters={filteredMonsters} seachCard={this.state.searchField}  />
      </div>
    );
  }
}
export default App;

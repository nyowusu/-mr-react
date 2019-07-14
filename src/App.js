import React, {Component} from 'react';
import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/search-box.component';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    }

  }

  myAsyncFetchUser = async () => {
    try {
        const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await usersResponse.json();
        this.setState({monsters: users});
    } catch (error) {
        console.log(`Unable to fetch users: ${error}`) 
    }
  }

  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then(response => response.json())
    //   .then(users => this.setState({monsters: users}))
    //   .catch(error => console.log("I have errored"));
    // or use
    this.myAsyncFetchUser();
  }

  componentDidUpdate() {
    console.log(this.state.searchField);
  }

  filterMonsters = () => {
    this.state.monsters.filter(monster => 
        monster.name.toLowerCase().includes(this.state.searchField.toLowerCase())
    );
  }

  handleChange = (e) => {
    this.setState({searchField: e.target.value})
  } 

  render () {

    const {searchField} = this.state;

    const filteredMonsters =  this.state.monsters.filter(
                                  monster => monster.name.toLowerCase().includes(searchField.toLowerCase())); 
    
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox placeholder="search monsters" handleChange={this.handleChange} />
        <CardList monsters={filteredMonsters} seachCard={this.state.searchField}  />
      </div>
    );
  }
}
export default App;

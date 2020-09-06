import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons : [
      {id : "a1", name : "Max", age : 27},
      {id : "a2", name : "Manu", age : 26},
      {id : "a3", name : "Steph", age : 26}
    ],

    anotherState : "anotherValue",

    showPersons : false
  }

  
  switchNameHandler = (newName) => {

    this.setState ( {
      persons : [
        {id : "a1", name : newName, age : 27},
        {id : "a2", name : "Manu", age : 26},
        {id : "a3", name : "Steph", age : 101}
      ]
    }
    );
  }

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;

    const personArray = [...this.state.persons];

    personArray[personIndex] = person;

    this.setState( {persons : personArray} );

    /*
    this.setState ( {
      persons : [
        {name : "Max", age : 27},
        {name : event.target.value, age : 26},
        {name : "Steph", age : 26}
      ]
    }
    );
    */
  }

  togglePersonsHandler = () => {

    const doesShow = this.state.showPersons;

    this.setState( {showPersons : !doesShow} );
  }

  deletePersonsHandler = (personIndex) => {

    //const personArray = this.state.persons;
    //this will change original array
    //const personArray = this.state.persons.slice();
    const personArray = [...this.state.persons];

    personArray.splice(personIndex, 1);

    this.setState( {persons : personArray} );
  }

  render() {

    let persons = null;

    let btnClass = [classes.Button];

    if (this.state.showPersons)
    {
      persons = (
        
        <div>
          {
          this.state.persons.map((person, index) => {
            return <Person
            click = {() => this.deletePersonsHandler(index)}
            name = {person.name}
            age = {person.age}
            key = {person.id}
            changed = {(event) => this.nameChangedHandler(event, person.id)}/>
          })
          }
        </div>

          /*
        <div>
        
      <Person name = {this.state.persons[0].name} age = {this.state.persons[0].age}/>

        <Person 
        name = {this.state.persons[1].name} 
        age = {this.state.persons[1].age}
        click = {this.switchNameHandler.bind(this,"MOHAIMIN")}
        changed = {this.nameChangedHandler}> Hobby is racing </Person>
  
      <Person name = {this.state.persons[2].name} age = {this.state.persons[2].age}/>
        
        </div>  
      */

        );

        btnClass.push(classes.Red);
       
      }

    const assignedClasses = [];
    
    if(this.state.persons.length <= 2)
    {
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <= 1)
    {
      assignedClasses.push(classes.bold);
    }

    return (
      
      <div className= {classes.App}>

        <h1>Hello ! I am napuli!</h1>

        <p className = {assignedClasses.join(" ")}> This is a paragraph</p>

        <button className = {btnClass.join(" ")} onClick={this.togglePersonsHandler} >TOGGLE PERSON LIST !</button>

        {persons}

      </div>
      
    );
  }
}

export default App;
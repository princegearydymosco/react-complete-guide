import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

// import styled from 'styled-components';
// import Radium, { StyleRoot } from 'radium';

// styled-components library, css syntax within backticks (`) in js file
// const StyledButton = styled.button`
//   background-color: ${props => props.alt ? 'red' : 'green'};
//   border: 1px solid black;
//   cursor: pointer;
//   &:hover { background-color: lightgreen;}`;

// use "Handler" to identify an event handler
// don't change the value of a property directly by doing this --- this.state.persons[0].name="Maximilian"
// instead make use of the setState or reactHook's useState second argument [currentState, newState]
// switchNameHandler = (newName) => {
//   this.setState({ persons: [{ name: newName, age: 24 }, { name: 'Lee', age: 28 }] })
// };

// state is internal only, props moves down the tree, but
// both trigger the DOM or a UI update because they are dynamic.
// before react 16.8, state was the only means of state management within a class-based component.
// when react 16.8 was released, useState was implemented in functional-based components for state management.
// now both class-based and functional-based can be stateful.
// however, by design, it is still recommended to use class-based as the only stateful component.
// and majority of the components should be functional/presentational, and only one stateful class-based component
// super() is called in the constructor constructor when extending the component
// old syntax would need to declare state in the constructor

class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    persons: [
      { id: '567890', name: 'Prince', age: 24 },
      { id: '123456', name: 'Lee', age: 25 },
      { id: '678901', name: 'Edward', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true
  };

  //static method
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    //always allow to update, persons list will be displayed
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => { return p.id === id; });
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });
  };


  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow,
    });
  };


  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  //render method is required because this is a class-based component
  render() {
    //inline styling use for the button below, this was with Radium
    // const biga = {
    //   backgroundColor: 'green',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //   }
    // };

    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />;
    }

    // biga.backgroundColor = 'red';
    // biga[':hover'] = {
    //   backgroundColor: 'lightred',
    //   color: 'black'
    // }


    //let classes = ['red', 'bold'].join(' ');
    //JSX part
    return (
      //one div only, one single root element to return, add under div only
      //one root component app
      //styleroot for transforming like media queries, you don't need to wrap if it just css pseudo selector like :hover
      // <StyleRoot>
      // {/* dynamic classes */ }
      // {/* <button style={biga} onClick={this.switchNameHandler.bind(this, 'Maximilian')}>Switch Name</button> */ }
      // {/* <button onClick={() => this.switchNameHandler('Maximilian')}>Switch Name</button> less efficient way*/ }
      // {/* <button onClick={this.switchNameHandler}>Switch Name</button> */ }
      // {/* <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>Toggle Persons</StyledButton> */ }
      // {/* <button style={biga} onClick={this.togglePersonsHandler}>Toggle Persons</button> */ } 

      <div className={classes.App} >
        <button onClick={() => { this.setState({ showCockpit: false }); }}>Remove Cockpit</button>
        {this.state.showCockpit ? <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}
        /> : null}
        { persons}
      </div>
      // </StyleRoot>
    );
    // return React.createElement('div', { className: "App" }, React.createElement('h1', null, 'Does this work now?'));
  }
}

//higher order component
// export default Radium(App);
export default App;


/*=========================== below is a functional-based approach of a stateful component ===========================*/
// useState for function-based, not needed to be imported from Component
// state and setState for class-based component, needs to imported from Component
// state can be used ONCE in a class-based component,
// while useState can be used or written MULTIPLE times in functional-based component
// useState DOESN'T merge! It overwrites the previousState.
// so otherStates like "others" or ALL state must be written in setPersonState.
// Otherwise they'll get lost. So to get rid of this problem, use useState multiple times.
// state DOES merge! everything in "state" (current state) are merged with "setState" (new state) 
// reactHooks like useState is available on React 16.8 up.
// useState always return TWO elements
// 1st current state / an OBJECT (ex. persons), and 2nd is new state / a FUNCTION (ex. setPersonsState)
// to pass a reference of switchNameHandler function in jsx, there should be no parenthesis
// else switchnamehandler() (*with parenthesis) would run automatically
// if you're having an error, your linting might be different and that it requires you to name
// a functional-based component variable in uppercase... like const App

// import React, { useState } from 'react'; // for react 16.8 and above
// import './App.css';
// import Person from './Person/Person';
// const App = props => {
//   const [personsState, setPersonsState] = useState({  
//     persons: [
//       { name: 'Prince', age: 24 },
//       { name: 'Lee', age: 25 }
//     ],
//     others: 'some other value'
//   });
//   const switchNameHandler = () => {
//     setPersonsState({
//       persons: [
//         { name: 'Geary', age: 24 },
//         { name: 'Lee', age: 28 }
//       ],
//       others: 'some other value'
//     });
//   };
//   return (
//     <div className="App">
//       <h1>Hi, I'm a React App</h1>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person name={personsState.persons[0].name} age={personsState.persons[0].age}>My Hobbies: Volleyball</Person>
//       <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Biking</Person>
//       <Person name="Edward" age="26">My Hobbies: Dancing</Person>
//     </div>
//   );
// }
// export default App;



/*=========================== below is a sample of rendering content conditionally ===========================*/
// togglePersonsHandler = () => {
//   const doesShow = this.state.showPersons;
//   this.setState({
//     showPersons: !doesShow,
//   });
// };
// return (
//   <div className="App">
//     <button onClick={this.togglePersonsHandler}></button>
//     {
//       this.state.showPersons ?
//       <div >
//         <--- content --->
//       </div>
//     }
//   </div>
// );

/*=========================== below is a more elegant way of rendering content conditionally ===========================*/
// instead of using a ternary expression in the return block
// you may store all the content of a div into a variable
// and reference that variable in the return block

// let persons = null;
// if (this.state.showPersons) {
//   persons = (
//     <div >
//       <--- content --->
//     </div>
//   );
// }
// return (
//   <div className="App">
//     {persons}
//   </div>
// );

/*=========================== below is a way of outputting a list ===========================*/
// map the elements of state.persons to access them one by one
// in copying an array, never directly copy the array like this below
// const persons = this.state.persons;
// instead make use of the slice method or the spread operator [...]
// const persons = this.state.persons.slice();
// it is an immutable way because you don't directly overwrite the original array.
// for the click attribute in <Person>, you may also make use of the bind method
// click = {this.deletePersonHandler.bind(this, index)}

// deletePersonHandler = (personIndex) => {  
//   const persons = [...this.state.persons];
//   persons.splice(personIndex, 1);
//   this.setState({ persons: persons });
// };
// if (this.state.showPersons) {
//   persons = (
//     <div>
//       {this.state.persons.map((person, index) => {
//         return <Person click={()=>this.deletePersonHandler(index)} name={person.name} age={person.age} />
//       })}
//     </div>
//   );
// }

/*=========================== below is an example of a flexible list w/ two-way binding ===========================*/
// the key={person.id} in every <Person> is very important.
// for one. it resolves an error with key prop.
// two. it updates the DOM more efficiently as the virtual DOM and actual DOM are compared using the key prop by react
// in the nameChangedHandler method, event is an update or changes in the input field.
// target the event and get the value of the input field.
// id is the second argument. once the id where the event occurs and the id in the state are equal,
// the index of the matched id in the state is taken.
// spread operator is only limited to arrays but also to an object's properties like this below.
// const person = { ...this.state.persons[personIndex] };
// since this is an object being copied immutably, you may also try this old syntax.
// const person = Object.assign({}, this.state.persons[personIndex]);
// assign in an empty object {} the properties of the object with matched id in the state

// nameChangedHandler = (event, id) => {
//   const personIndex = this.state.persons.findIndex(p => { return p.id === id; });
//   const person = { ...this.state.persons[personIndex] };
//   person.name = event.target.value;
//   const persons = [...this.state.persons];
//   persons[personIndex] = person;
//   this.setState({
//     persons: persons
//   });
// };

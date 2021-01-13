import React, { PureComponent } from 'react';
import Person from './Person/Person';

//const persons = (props) => {
// class Persons extends Component {
//PureComponent to check for all props in a class-based component instead of usign shouldUpdateComponent
class Persons extends PureComponent {
    //part of the creation lifecycle hook
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    //part of the update lifecycle hook
    //optimization of shouldComponentUpdate
    //return false if persons pointer didn't change
    //this wouldn't work if we didn't make a copy of 
    //the person object and new persons array using spread operator
    //because the pointer is just the same, even if the content has changed
    //so make a new object with new pointer, to compare with previous object and pointer
    // shouldComponentUpdate(nextProps, nextState) {
    //     //can't be empty, should be true or false
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     //this is just comparing pointers because these are arrays
    //     if (nextProps.persons !== this.props.persons ||
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked) { return true; }
    //     else { return false; }
    // }

    getSnapshotBeforeUpdate() {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Snapshot!' };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Person.js] componentDidUpdate');
        console.log(snapshot);
    }

    //clean up work
    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
        console.log('[Persons.js] rendering...');
        return this.props.persons.map((person, index) => {
            return (<Person
                pindot={() => this.props.clicked(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)} />);
        });
    }
}
//class component, capitalize
//functional lowercase
export default Persons;
import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const cockpit = props => {
    //run every render() cycle
    //to avoid re-running with changes, add second argument [props.persons]
    //like componentDidMount: to run only for the first time, second argument is empty array []
    //useEffect can be used multiple times
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // const timer = setTimeout(() => { alert('Saved data to cloud!') }, 1000);
        setTimeout(() => { alert('Saved data to cloud!') }, 1000);
        return () => {
            //clearTimeout(timer);
            //runs before the main useEffect, but after the first render cycle
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []);

    //cleanup before updating
    //every render() cycle
    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect')
        };
    });


    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) { btnClass = classes.Red; }
    //classes = ['red']
    if (props.personsLength <= 2) { assignedClasses.push(classes.red); }
    //classes = ['red', 'bold']
    if (props.personsLength <= 1) { assignedClasses.push(classes.bold); }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is working!</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

//React.memo(): optimization for functional components
//detects changes based on props passed
//if nothing has changed useEffect and memo component does not get re-rendered.
export default React.memo(cockpit);
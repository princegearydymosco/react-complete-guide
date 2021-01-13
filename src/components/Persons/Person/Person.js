import React, { Component } from 'react';
// import './Person.css'; //made aware only, not merge, then bundled
// import Radium from 'radium';
// import styled from 'styled-components';

import classes from './Person.css';

import Aux from '../../../hoc/Auxiliary';

//since React 16.2, there's a built-in aux called fragment...
// you may import it like import {Fragment} from 'react'
// or import React only then use <React.Fragment>

//just store to stylediv because styled.div already returns a react component
// const StyledDiv = styled.div`
//     @media (min-width: 500px) {
//       width: 450px;
//     }
// `;

// converting functional to class components
// import Component from react as it is used in class Name extends Component
// you can pass methods as props like props.pindot
// if class based components, use this.props.name
// you can right simple dynamic lines in JSX. just simple calculation, no conditionals like if's
// const person = (props) => {
//     const style = {
//         '@media (min-width: 500px)': {width: '450px'}
//     };
//     return <p>I'm a {props.name} and I'm {Math.floor(Math.random() * 30)} years old!</p>
//     return <p>I'm a {props.name} and I'm {props.age} years old!</p>
// };


class Person extends Component {
    render() {
        console.log('[Person.js] rendering...');
        return (
            // <div className="Person" style={style}>
            // <StyledDiv>
            //you can have adjacent elements, as long as, they have uniques
            //you may remove div classes.Person then, enclose everything in return [] then add commas to make an array
            //react accepts to return an array as long as it has unique ID's
            //return [<p key='i1'></p>,<pkey='i2'></pkey=>, <input key='i3'></input>]
            //<div className={classes.Person}>
            <Aux>
                <p onClick={this.props.pindot} > I'm a {this.props.name} and I'm {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                {/* two-way binding setup */}
                <input type="text" onChange={this.props.changed} value={this.props.name}></input>
            </Aux>
            // </div>
            // </StyledDiv>
            // </div >
        );
    }
}

// export default Radium(person);
export default Person;
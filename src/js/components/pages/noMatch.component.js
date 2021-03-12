import React from 'react';

export class NoMatchPageComponent extends React.Component{
    render(){
        console.log(this.props)
        return (
             <h1>Page not found {this.props.location.pathname} </h1>
        )
    }
}
import React, { Component } from 'react';

export default class Cell extends Component{
  constructor(props){
    super(props); 
    this.state = {
      isBlank: props.isBlank,
    }
  }

  render(){
    return (
      <div className="cell">
        {this.props.index}
      </div>
    )
  }
}
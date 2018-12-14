import React, { Component } from 'react'

export default class PuzzleConfigUI extends Component {
  constructor(props){
    super(props)
    this.state = {
      tempSize: 3,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.createPuzzle = this.createPuzzle.bind(this)
  }

  // methods
  handleInputChange(e){
    let val = e.target.value >> 0
    val = val < 3 ? 3 : 
      val > 10 ? 10 :
      val
    this.setState({
      tempSize: val
    })
  }

  createPuzzle(){
    const size = this.state.tempSize
    this.props.createPuzzle(size)
  }


  render(){
    return (
      <div>
        <input 
          type="number" 
          placeholder="Size ∈ [3,10]"
          value={this.state.tempSize}
          min="3"
          max="10"
          onChange={e=>{
            this.setState({
              tempSize : e.target.value
            })
          }}
          onBlur={this.handleInputChange}
        />
        <button
          onClick={this.createPuzzle}
        >
          Create
        </button>
        <button
          onClick={this.props.shufflePuzzle}
        >
          Shuffle
        </button>
        
      </div>
    )
  }
}
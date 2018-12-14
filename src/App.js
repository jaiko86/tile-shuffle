import React, { Component } from 'react'
import './App.css'
import './style/puzzle.scss'
import Puzzle from './components/Puzzle.js'
import PuzzleConfigUI from './components/PuzzleConfigUI.js'



function shuffleArray(arr){
  let random = limit=>Math.floor(Math.random() * limit)
  let length = arr.length
  for(let i = 0; i < length; i++){
    let randomIdx = random(length)
    let temp = arr[randomIdx]
    arr[randomIdx] = arr[i]
    arr[i] = temp
  }
  return arr
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      size: 3,
      blankIdx: 9,
      cellsArray: [],
      isSolution: false,
      // snapshots: [],
      // currStep: 0,
      // autoPlay: false,
      // isSolved: false,
      // stepCount: 0,
      // isTransitioning: false,
    }

    //bind this
    this.createPuzzle = this.createPuzzle.bind(this)
    this.shufflePuzzle = this.shufflePuzzle.bind(this)
    this.swap = this.swap.bind(this)
    this.checkSolution = this.checkSolution.bind(this)
  }

  // methods
  createPuzzle(size){
    let arr = []
    let temp = size ** 2
    while (temp--) arr.unshift(temp)
    this.setState({
      size,
      cellsArray: arr,
      blankIdx: size ** 2 - 1,
      isSolution: false,
    })
  }

  shufflePuzzle(){
    let arr = this.state.cellsArray
    arr = shuffleArray([...arr])
    this.setState(state => ({
      cellsArray: arr
    }))
  }

  swap(idx1, idx2, val1, val2){

    let newArr = [...this.state.cellsArray]
    // console.log(newArr)
    newArr[idx1] = val2
    newArr[idx2] = val1
    // console.log(newArr)
    this.setState(state => ({
      cellsArray: newArr
    }))
    this.checkSolution(newArr)
  }

  checkSolution(cellsArray){
    // let { cellsArray } = this.state
    let { length } = cellsArray
    let isSolution = true
    // all positions must be equal to its cellNum
    for (let cellNum = 0; cellNum < length; cellNum++) {
      let pos = cellsArray[cellNum]
      if (pos !== cellNum) {
        isSolution = false
        break
      }
    }
    this.setState({
      isSolution
    })
  }

  
  render() {
    return (
      <div>
        <PuzzleConfigUI
          createPuzzle={this.createPuzzle}
          shufflePuzzle={this.shufflePuzzle}
        />
        <Puzzle
          size={this.state.size}
          cellsArray={this.state.cellsArray}
          blankIdx={this.state.blankIdx}
          checkSolution={this.checkSolution}
          isSolution={this.state.isSolution}

          swap={this.swap}
        />
        <div class="solution-msg">
          {this.state.isSolution ? 'Solved!' : ''}
        </div>
      </div>
    )
  }
}

export default App

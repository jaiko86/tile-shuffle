import React, { Component } from 'react';

export default class Puzzle extends Component {
  constructor(props){
    super(props)

    this.moveCell = this.moveCell.bind(this)
    this.checkSolution = this.checkSolution.bind(this)
  }

  // static methods
  getCoordinate(pos){
    let size = this.props.size
    let x = pos % size
    let y = Math.floor(pos / size)
    return {x, y}
  }

  checkSolution(){

  }

  // methods
  moveCell(cellPos){
    let { cellsArray, blankIdx } = this.props
    let blankPos = cellsArray[blankIdx]
    let blankCoor = this.getCoordinate(blankPos)
    let cellIdx = cellsArray.indexOf(cellPos)
    let cellCoor = this.getCoordinate(cellPos)

    let x1 = blankCoor.x
    let y1 = blankCoor.y
    let x2 = cellCoor.x
    let y2 = cellCoor.y
    
    let cond1 = x1 === x2
    let cond2 = y1 === y2
    let cond3 = Math.abs(x1 - x2) === 1
    let cond4 = Math.abs(y1 - y2) === 1

    if ((cond1 && cond4) || (cond2 && cond3)) {
      this.props.swap(blankIdx, cellIdx, blankPos, cellPos)
    }
  }

  render() {
    // cellArray[2] = 5 => cell#2 is at Position 5
    let { cellsArray, size, isSolution } = this.props
    let isSmall = size > 5
    let dim = isSmall ? 80 : 100
    let cellDivs = cellsArray.map((pos, cellNum)=>{
      let isBlank = cellNum === this.props.blankIdx
      let {x, y} = this.getCoordinate(pos)
      let elem = (
        <div
          className={[
            'cell', 
            isBlank ? 'blank' : '',
            isSmall ? 'small' : '',
          ].join(' ')}
          key={cellNum}
          style={{
            left: x * dim,
            top: y * dim,
          }}
          onClick={() => { 
            if(!isBlank) this.moveCell(pos)
          }}
        >
          {isBlank ? '' : cellNum + 1}
        </div>
      )
      return elem
    })
    let width = size * dim
    let height = size * dim
    return (
      <div 
        className={[
          'puzzle',
          isSolution ? 'solution' : ''
        ].filter(e=>e).join(' ')}
        style={{width, height}}
      >
        {cellDivs}
      </div>
    );
  }
}
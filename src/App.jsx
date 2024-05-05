"use client";
import { useState } from "react";
import Grid from "./grid";

function App() {
  const [grid, setGrid] = useState([]);
  const [initialiseGrid, setInitialiseGrid] = useState(false);
  const [solution, setSolution] = useState([]);
  const [initialiseSolution, setInitialiseSolution] = useState(false);

  async function getSudoku() {
    const response = await fetch(
      "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}"
    );
    const json = await response.json();
    const sudoku = json.newboard.grids[0].value;
    const joinedSudoku = [];
    for (let i = 0; i < 9; i++) {
      let row = sudoku[i];
      for (let j = 0; j < 9; j++) {
        joinedSudoku.push(row[j]);
      }
    }
    setGrid(joinedSudoku);
    setInitialiseGrid(true);
    setSolution(joinedSudoku);
  }

  function solveSudoku() {
    setSolution(grid);
    setInitialiseSolution(true);
    let solution = [...grid];
    let zeroIndices = solution.reduce((indices, number, index) => {
      if (number === 0) {
        indices.push(index);
      }
      return indices;
    }, []);

    let currentIndex = 0;
    while (currentIndex >= 0 && currentIndex < zeroIndices.length) {
      let possibleNumbers = [];
      for (let j = 1; j < 10; j++) {
        if (j > solution[zeroIndices[currentIndex]]) {
          possibleNumbers.push(j);
        }
      }
      let foundValidNumber = false;
      for (let k = 0; k < possibleNumbers.length; k++) {
        if (
          isValidValue(possibleNumbers[k], zeroIndices[currentIndex], solution)
        ) {
          solution[zeroIndices[currentIndex]] = possibleNumbers[k];
          setSolution([...solution]);
          foundValidNumber = true;
          break;
        }
      }
      if (!foundValidNumber) {
        solution[zeroIndices[currentIndex]] = 0;
        currentIndex--;
      } else {
        currentIndex++;
      }
    }
  }

  function isValidValue(number, index, currentSolution) {
    const row1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const row2 = row1.map((index) => index + 9);
    const row3 = row2.map((index) => index + 9);
    const row4 = row3.map((index) => index + 9);
    const row5 = row4.map((index) => index + 9);
    const row6 = row5.map((index) => index + 9);
    const row7 = row6.map((index) => index + 9);
    const row8 = row7.map((index) => index + 9);
    const row9 = row8.map((index) => index + 9);
    const rows = [row1, row2, row3, row4, row5, row6, row7, row8, row9];

    const column1 = [0, 9, 18, 27, 36, 45, 54, 63, 72];
    const column2 = column1.map((index) => index + 1);
    const column3 = column2.map((index) => index + 1);
    const column4 = column3.map((index) => index + 1);
    const column5 = column4.map((index) => index + 1);
    const column6 = column5.map((index) => index + 1);
    const column7 = column6.map((index) => index + 1);
    const column8 = column7.map((index) => index + 1);
    const column9 = column8.map((index) => index + 1);
    const columns = [
      column1,
      column2,
      column3,
      column4,
      column5,
      column6,
      column7,
      column8,
      column9,
    ];

    const topLeftIndeces = [0, 1, 2, 9, 10, 11, 18, 19, 20];
    const topMiddleIndeces = topLeftIndeces.map((index) => index + 3);
    const topRightIndeces = topMiddleIndeces.map((index) => index + 3);
    const middleLeftIndeces = [27, 28, 29, 36, 37, 38, 45, 46, 47];
    const middleMiddleIndeces = middleLeftIndeces.map((index) => index + 3);
    const middleRightIndeces = middleMiddleIndeces.map((index) => index + 3);
    const bottomLeftIndeces = [54, 55, 56, 63, 64, 65, 72, 73, 74];
    const bottomMiddleIndeces = bottomLeftIndeces.map((index) => index + 3);
    const bottomRightIndeces = bottomMiddleIndeces.map((index) => index + 3);
    const subGrids = [
      topLeftIndeces,
      topMiddleIndeces,
      topRightIndeces,
      middleLeftIndeces,
      middleMiddleIndeces,
      middleRightIndeces,
      bottomLeftIndeces,
      bottomMiddleIndeces,
      bottomRightIndeces,
    ];

    let indecesToCheck = [];

    for (let row of rows) {
      if (row.includes(index)) {
        indecesToCheck.push(row);
      }
    }
    for (let column of columns) {
      if (column.includes(index)) {
        indecesToCheck.push(column);
      }
    }
    for (let subGrid of subGrids) {
      if (subGrid.includes(index)) {
        indecesToCheck.push(subGrid);
      }
    }

    for (let array of indecesToCheck) {
      for (let indexToCheck of array) {
        if (currentSolution[indexToCheck] == number) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div className="text-center">
      <p className="text-sky-400/100 text-2xl font-bold p-1 m-2">
        Sudoku Solver
      </p>
      <button
        onClick={getSudoku}
        className="border rounded-md border-black p-1 m-2"
      >
        Generate Sudoku
      </button>
      {!initialiseGrid && <p>Retrieves a soduku from the Dosuku API</p>}
      {initialiseGrid && (
        <>
          <div className="flex justify-center m-50">
            <Grid numbers={grid} />
          </div>

          <button
            onClick={solveSudoku}
            className="border rounded-md border-black p-1 m-2"
          >
            Solve Sodoku
          </button>
          {!initialiseSolution && (
            <p>Solves the Sudoku using a brute force algorithm</p>
          )}
          {initialiseSolution && (
            <div>
              <div className="flex justify-center m-50">
                <Grid numbers={solution} />
              </div>
              <br></br>
              <br></br>
              <p className="pb-10">
                This solution was generated by an algorithm<br></br> which loops
                though all of the empty squares<br></br> in the initial grid,
                filling in the lowest possible<br></br> value for each square.
                <br></br>
                <br></br>
                If it finds that are no possible values for a<br></br>
                given square, it backtracks to the previous<br></br> square it
                filled and increases its value by one.
                <br></br>
                <br></br>
                Using this method, this algorithm will eventually<br></br> find
                a solution to any solvable sudoku puzzle.<br></br>
                <br></br> It just might take a while.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;

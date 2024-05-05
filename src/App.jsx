"use client";
import { useState } from "react";
import Grid from "./grid";

function App() {
  const [grid, setGrid] = useState([]);
  const [solution, setSolution] = useState([]);
  const [initialiseGrid, setInitialiseGrid] = useState(false);
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
  }

  function solveSudoku() {
    setSolution(grid);
    setInitialiseSolution(true);
    let solution = [...grid];
    let zeroIndeces = solution.map((number, index) => {
      if (number == 0) {
        return index;
      }
    });
    for (let i = 0; i < zeroIndeces.length; i++) {
      let currentIndex = zeroIndeces[i];
      let possibleNumbers = [];
      for (let j = 1; j < 10; j++) {
        if (j > solution[currentIndex]) {
          possibleNumbers.push(j);
        }
      }
      for (let j = 0; j < possibleNumbers.length; j++) {
        if (isValidValue(possibleNumbers[j])) {
          solution[currentIndex] = possibleNumbers[j];
          break;
        }
        solution[currentIndex] = 0;
        i--;
      }
      solution[currentIndex] = 1;
      // loop through possible numbers
      // set to the lowest one using checker
      // if no possible numbers set back to zero and set i--
      setSolution(solution);
    }
  }

  return (
    <div className="text-center">
      <p className="text-sky-400/100">Sudoku Solver</p>
      <button
        onClick={getSudoku}
        className="border rounded-md border-black p-1 m-2"
      >
        Generate Sudoku
      </button>
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
          {initialiseSolution && (
            <div className="flex justify-center m-50">
              <Grid numbers={solution} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;

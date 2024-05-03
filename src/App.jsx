"use client";
import { useState } from "react";
import Grid from "./grid";

function App() {
  const [grid, setGrid] = useState([]);
  const [initialiseGrid, setInitialiseGrid] = useState(false);

  async function getSudoku() {
    const response = await fetch(
      "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}"
    );
    const json = await response.json();
    const sudoku = json.newboard.grids[0].value;
    setGrid(sudoku);
    setInitialiseGrid(true);
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
      <div className="flex justify-center m-50">
        {initialiseGrid && <Grid numbers={grid} />}
      </div>
    </div>
  );
}

export default App;

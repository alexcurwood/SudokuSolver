# SudokuSolver

## I created an application which retrieves a Sudoku puzzle from the Dosuku API and solves it using a brute force algorithm.

### Motivations

I started this project as an exercise in problem-solving and algorithmic thinking.

Sudokus are one of the most common and researched puzzle types, making them an easy choice for this exercise.

### Research and Chosen Algorithm

I started by retrieving and displaying a Sudoku puzzle from the Dosuku API.

I then researched the different algorithms that can be used to solve a sudoku puzzle. I chose a brute force algorithm based on its simplicity and efficacy in finding solutions in a smaller solution space.

From my research, I broke down the algorithm steps into the following:
1) Start with the first empty square in the puzzle and fill it with the lowest possible value
2) Move on to the next square and do the same
3) If no possible values are found, return to the previous square and increase its value by one

This algorithm will eventually solve any solvable Sudoku puzzle

### Challenges

I faced various challenges while implementing this algorithm within my application.

The first was finding the empty squares within the original Sudoku grid. I achieved this using an array.reduce() callback function. I originally attempted this using an array.map() function but quickly learned the distinction between map() and reduce(): map() will always return an array with the same size as the array it was called on, whereas reduce() will return a single index as its result. Using an array as the returned index for a reduce() function and populating this array over the callback function's execution therefore allows you to return an array with a different length to the original. This was the desired result for my algorithm, and reduce() was thereby a far better choice.

The second challenge was defining the checker function for finding the lowest possible value at each empty square. I achieved this by defining all the possible rows, columns, and 3x3 subgrids within the original Sudoku grid. The checker function then finds which specific row, column and subgrid the given empty square is within, and checks all of the indices within them against the possible value. If it finds the value at any of the given indices, it returns false and else returns true. This is not the most efficient way of executing a checker function. In particular, how my function generates the rows, columns, and subgrids and selects the empty square is inefficient. I will look to improve the efficiency of this function in future and would appreciate any feedback or ideas on how to do so.

The third challenge was implementing backtracking within my algorithm. I achieved this by implementing a tracker outside my while loop, which marks the current index being considered within the zeroIndeces array. Inside the while loop, this tracker is then manipulated based on whether there are any possible values for the current index. If there are no possible values, the current index is decreased by one to reconsider the previous index, if there is a possible value, it increments the current index by one and continues.

### Outcome

Once I had overcome these challenges I had the infrastructure to complete my algorithm.

This project proved highly beneficial, allowing me to improve my problem-solving, research, and code organisation skills, whilst solving a puzzle I find interesting.

## I deployed the application using Vercel and styled it using Tailwind CSS

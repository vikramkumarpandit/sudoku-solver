// Generate the 9x9 grid
const board = document.getElementById('sudoku-board');
let cells = [];

for (let i = 0; i < 81; i++) {
  const input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('min', '1');
  input.setAttribute('max', '9');

  // Add borders for 3x3 boxes
  const row = Math.floor(i / 9);
  const col = i % 9;
  if (col % 3 === 0) input.style.borderLeft = '2px solid #333';
  if (row % 3 === 0) input.style.borderTop = '2px solid #333';
  if (col === 8) input.style.borderRight = '2px solid #333';
  if (row === 8) input.style.borderBottom = '2px solid #333';

  board.appendChild(input);
  cells.push(input);
}


function getBoard() {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 9; j++) {
      const value = parseInt(cells[i * 9 + j].value);
      grid[i][j] = isNaN(value) ? 0 : value;
    }
  }
  return grid;
}

function setBoard(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells[i * 9 + j].value = grid[i][j] === 0 ? '' : grid[i][j];
    }
  }
}

function isSafe(grid, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }

  const startRow = row - (row % 3), startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

function solveSudoku(grid, row = 0, col = 0) {
  if (row === 9) return true;
  if (col === 9) return solveSudoku(grid, row + 1, 0);
  if (grid[row][col] !== 0) return solveSudoku(grid, row, col + 1);

  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;
      if (solveSudoku(grid, row, col + 1)) return true;
      grid[row][col] = 0;
    }
  }
  return false;
}

function solve() {
  let boardData = getBoard();
  if (solveSudoku(boardData)) {
    setBoard(boardData);
    alert("Solved!");
  } else {
    alert("No solution exists.");
  }
}

function clearBoard() {
  cells.forEach(cell => cell.value = '');
}

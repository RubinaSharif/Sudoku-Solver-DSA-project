// Create 9x9 grid
window.onload = () => {
    const board = document.getElementById("board");
    for (let i = 0; i < 81; i++) {
      const input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("min", "1");
      input.setAttribute("max", "9");
      board.appendChild(input);
    }
  };
  
  function getBoardValues() {
    const inputs = document.querySelectorAll("#board input");
    const board = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        const value = parseInt(inputs[i * 9 + j].value);
        row.push(isNaN(value) ? 0 : value);
      }
      board.push(row);
    }
    return board;
  }
  
  function setBoardValues(board) {
    const inputs = document.querySelectorAll("#board input");
    for (let i = 0; i < 81; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      inputs[i].value = board[row][col] !== 0 ? board[row][col] : '';
    }
  }
  
  function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
  
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) return false;
      }
    }
    return true;
  }
  
  function solve(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  function solveSudoku() {
    const board = getBoardValues();
    if (solve(board)) {
      setBoardValues(board);
      alert("Solved!");
    } else {
      alert("No solution exists.");
    }
  }
  
  function clearBoard() {
    document.querySelectorAll("#board input").forEach(input => input.value = '');
  }
function validateBoard(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = board[row][col];
        if (num === 0) continue;
  
        // Check row & column (Rule 1)
        for (let i = 0; i < 9; i++) {
          if (i !== col && board[row][i] === num) {
            alert(`Rule 1 Violation: Number ${num} is repeated in Row ${row + 1}`);
            return false;
          }
          if (i !== row && board[i][col] === num) {
            alert(`Rule 1 Violation: Number ${num} is repeated in Column ${col + 1}`);
            return false;
          }
        }
  
        // Check 3x3 grid (Rule 2)
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
          for (let j = startCol; j < startCol + 3; j++) {
            if ((i !== row || j !== col) && board[i][j] === num) {
              alert(`Rule 2 Violation: Number ${num} is repeated in 3x3 Grid starting at Row ${startRow + 1}, Column ${startCol + 1}`);
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  
  function solveSudoku() {
    const board = getBoardValues();
  
    if (!validateBoard(board)) {
      return;
    }
  
    if (solve(board)) {
      setBoardValues(board);
      alert("Solved!");
    } else {
      alert("No solution exists.");
    }
  }

  window.onload = () => {
    const board = document.getElementById("board");
    board.innerHTML = ''; // Clear previous cells if any
    for (let i = 0; i < 81; i++) {
      const input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("min", "1");
      input.setAttribute("max", "9");
      board.appendChild(input);
    }
    generateRandomBoard(); // Add random numbers
  };
  function generateRandomBoard() {
    const inputs = document.querySelectorAll("#board input");
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  
    function placeInBoard(row, col, num) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;
        inputs[row * 9 + col].value = num;
        inputs[row * 9 + col].setAttribute("disabled", "true"); // prevent user editing
        return true;
      }
      return false;
    }
  
    for (let gridRow = 0; gridRow < 3; gridRow++) {
      for (let gridCol = 0; gridCol < 3; gridCol++) {
        const numsToPlace = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const cellsToFill = Math.floor(Math.random() * 3) + 1; // 1–3 random cells
  
        let placed = 0;
        while (placed < cellsToFill && numsToPlace.length > 0) {
          const randRow = gridRow * 3 + Math.floor(Math.random() * 3);
          const randCol = gridCol * 3 + Math.floor(Math.random() * 3);
          const num = numsToPlace.pop();
  
          if (board[randRow][randCol] === 0 && placeInBoard(randRow, randCol, num)) {
            placed++;
          }
        }
      }
    }
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  function solveSudoku() {
    const board = getBoardValues();
  
    if (!validateBoard(board)) {
      alert("Oops! You failed to solve it. Please try again.");
      return;
    }
  
    const isComplete = board.every(row => row.every(cell => cell !== 0));
  
    if (isComplete) {
      alert("🎉 Congratulations! You successfully solved it.");
      return;
    }
  
    if (solve(board)) {
      setBoardValues(board);
      alert("Solved!");
    } else {
      alert("No solution exists.");
    }
  }
  function restartGame() {
    const board = document.getElementById("board");
    board.innerHTML = ''; // Clear the board HTML
  
    for (let i = 0; i < 81; i++) {
      const input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("min", "1");
      input.setAttribute("max", "9");
      board.appendChild(input);
    }
  
    generateRandomBoard(); // Fill with new random numbers
  }
  
  
  
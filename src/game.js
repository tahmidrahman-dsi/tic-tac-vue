function getWinConditions(dimension) {
  const winCoditionForRows = [];
  const winConditionForColumns = [];
  const winConditionForDiagonals = [];

  const LEFT_DIAGONAL_INDEX = 0;
  const RIGHT_DIAGONAL_INDEX = 1;

  for (let position = 0; position < dimension * dimension; position++) {
    let rowCursor = Math.floor(position / dimension);
    let columnCursor = position % dimension;

    if (!winCoditionForRows[rowCursor]) {
      winCoditionForRows[rowCursor] = [];
    }

    winCoditionForRows[rowCursor].push(position);

    if (!winConditionForColumns[columnCursor]) {
      winConditionForColumns[columnCursor] = [];
    }

    winConditionForColumns[columnCursor].push(position);

    if (rowCursor === columnCursor) {
      if (!winConditionForDiagonals[LEFT_DIAGONAL_INDEX]) {
        winConditionForDiagonals[LEFT_DIAGONAL_INDEX] = [];
      }
      winConditionForDiagonals[LEFT_DIAGONAL_INDEX].push(position);
    }

    if (rowCursor + columnCursor + 1 === dimension) {
      if (!winConditionForDiagonals[RIGHT_DIAGONAL_INDEX]) {
        winConditionForDiagonals[RIGHT_DIAGONAL_INDEX] = [];
      }
      winConditionForDiagonals[RIGHT_DIAGONAL_INDEX].push(position);
    }
  }

  return [
    ...winCoditionForRows,
    ...winConditionForColumns,
    ...winConditionForDiagonals
  ];
}

function getWinningCondition(grid, dimension) {
  var winConditions = getWinConditions(dimension);
  const winConditionFinderReducer = (found, cell, i, self) =>
    found && Boolean(cell) && i > 0 && cell === self[i - 1];
  return winConditions.find((positions) =>
    positions
      .map((position) => grid[position])
      .reduce(winConditionFinderReducer)
  );
}

export function checkGameState(grid, turn, dimension) {
  var winningCondition = getWinningCondition(grid, dimension);

  if (winningCondition) {
    return { over: true, winningCondition, winner: turn };
  } else if (grid.every(Boolean)) {
    return { over: true, winner: null };
  } else return { over: false };
}

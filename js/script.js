let template = "<div class='container'><form id = 'matrix-create' action='#'><div class='center'>" +
"Rows: <input class='size' type='text' value='0'>Columns: <input class='size' type='text' " +
"value='0'><input class='submit' onclick='createMatrix();' type='button' value='Set Matrix " +
"Size'> </div> </form> </div> <form id='matrix-form' action='#'> <div class='table-container " +
"center inline'> <table class='left' id='matrix'> </table> <table class ='right' id='solution'> " +
"</table> </div> <div id='submit-button'> </div> </form>";
$(document).ready(function () {
  homeScreen();}
);

function homeScreen() {
  let $content = $('.content');
  $content.empty();
  $content.append(template);
}

function createMatrix() {

  let height = parseFloat(document.getElementById('matrix-create').elements[0].value);
  let width = parseFloat(document.getElementById('matrix-create').elements[1].value);

  if (isNaN(width) || isNaN(height)) {
    alert('Please input a numeric width or height');
    return;
  }

  if (width < 2) {
    alert('Must have at least 2 columns!');
    return;
  }

  if (height < 1) {
    alert('Must have at least 1 row!');
    return;
  }

  let $matrix = $('#matrix');
  let $solution = $('#solution');
  $matrix.empty();
  $solution.empty();
  let mrow = "<tr class='mrow'></tr>";
  let srow = "<tr class='srow'></tr>";

  for (let i = 0; i < height; i++) {
    $matrix.append(mrow);
    $solution.append(srow);
  }

  let column = "<td><input class='entry' type='text' value='0'></td>";
  let $mrows = $('.mrow');
  let $srows = $('.srow');
  $srows.append(column);

  for (let i = 0; i < width - 1; i++) {
    $mrows.append(column);
  }

  let $submit = $('#submit-button');
  $submit.empty();
  let submitButton = "<input class='submit' type='button' onclick='simplify(" +
  height + ',' + width + ");' value='Go!'>";

  $submit.append(submitButton);

}

function simplify(height, width) {
  //load the matrix
  let $mrows = $('.mrow');
  let $srows = $('.srow');
  let matrix = [];
  for (let i = 0; i < height; i++) {
    matrix[i] = [];
    for (let j = 0; j < width - 1; j++) {
      matrix[i][j] = $mrows.get(i).childNodes[j].childNodes[0].value;
    }

    matrix[i][width - 1] = $srows.get(i).childNodes[0].childNodes[0].value;
  }

  //empty the page
  let $content = $('.content');
  $content.empty();

  //actual simplification algorithm
  let pivot = 0;
  let pivotIndex = 0;

  //REF simplify
  while (pivot < height && pivotIndex < width) {
    let oneFound = false;
    let emptyColumn = true;

    //See if any pivot is already a 1
    for (let i = pivot; i < height; i++) {
      if (parseFloat(matrix[pivot][pivotIndex]) === 1.0) {
        swapRow(pivot, i, matrix);
        oneFound = true;
        emptyColumn = false;
      }
    }

    if (!oneFound) {
      //find the first nonzero pivot
      let nonZero = pivot;
      while (nonZero < height && parseFloat(matrix[nonZero][pivotIndex]) === 0) {
        nonZero++;
      }

      //If no nonzero pivot
      if (nonZero === height) {
        pivotIndex++;
      } else {
        emptyColumn = false;
        if (nonZero !== pivot) {
          swapRow(pivot, nonZero, matrix);
        }

        multiplyConstant(pivot, 1 / parseFloat(matrix[nonZero][pivotIndex]), matrix);

      }

      for (let i = pivot + 1; i < height; i++) {
        addRowtoRow(i, pivot, -parseFloat(matrix[i][pivotIndex]), matrix);
      }

    }

    if (!emptyColumn) {
      pivot++;
      pivotIndex++;
    }
  }

  //Backpropagate for RREF
  if (pivot === height) {
    pivot = height - 1;
  }

  if (pivotIndex === width) {
    pivotIndex = width - 1;
  }

  while (pivot >= 0 && pivotIndex >= 0) {
    for (let i = pivot - 1; i >= 0; i--) {
      addRowtoRow(i, pivot, -parseFloat(matrix[i][pivotIndex - 1]), matrix);
    }

    pivot--;
    pivotIndex--;
  }

  //add a button to go back to matrix creation
  let button = "<button class='submit new' onclick='homeScreen();'>New Matrix</button>";
  $content.append(button);

}

/*
  =================
  matrix operations
  =================
*/

// R1 <=> R2
function swapRow(row1, row2, matrix) {
  let tempRow = matrix[row1];
  matrix[row1] = matrix[row2];
  matrix[row2] = tempRow;
  message = 'Swap Row ' + (row1 + 1) + ' with Row ' + (row2 + 1);
  printOperation(message, matrix);
}

// R = cR
function multiplyConstant(row, scalar, matrix) {
  for (let i = 0; i < matrix[row].length; i++) {
    matrix[row][i] = scalar * matrix[row][i];
  }

  message = 'Multiply Row ' + (row + 1) + ' by ' + scalar;
  printOperation(message, matrix);
}

// R1 = R1 + cR2
function addRowtoRow(row1, row2, scalar, matrix) {
  if (scalar === 0)
    return;
  for (let i = 0; i < matrix[row1].length; i++) {
    matrix[row1][i] = parseFloat(matrix[row1][i]) + scalar * matrix[row2][i];
  }

  message = 'Add ' + scalar + ' times Row ' + (row2 + 1) + ' to Row ' + (row1 + 1);
  printOperation(message, matrix);
}

// Print out the current operation and what the matrix looks like now
function printOperation(message, matrix) {
  let operationMessage = "<div class = 'center'><p>" + message + '</p></div>';
  let table = "<table class = 'center grid'>";
  for (let i = 0; i < matrix.length; i++) {
    table += '<tr>';
    for (let j = 0; j < matrix[i].length; j++) {
      table += '<td class = "entry">' + matrix[i][j] + '</td>';
    }

    table += '</tr>';
  }

  let $content = $('.content');
  $content.append(operationMessage);
  $content.append(table);

}


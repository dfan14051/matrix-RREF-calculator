let template = "<div class='container'><form id = 'matrix-create' action='#'><div class='center'>Rows: <input class='size' type='text' value='0'>Columns: <input class='size' type='text' value='0'><input class='submit' onclick='createMatrix();' type='button' value='Set Matrix Size'> </div> </form> </div> <form id='matrix-form' action='#'> <div class='table-container center inline'> <table class='left' id='matrix'> </table> <table class ='right' id='solution'> </table> </div> <div id='submit-button'> </div> </form>";
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
  let $mrows = $('.mrow');
  let $srows = $('.srow');
  let matrix = [];
  for (let i = 0; i < height; i++) {
    matrix[i] = [];
    for (let j = 0; j < width - 1; j++) {
      console.log($mrows.get(i).childNodes[j].childNodes[0].value);
      matrix[i][j] = $mrows.get(i).childNodes[j].childNodes[0].value;
    }

    matrix[i][width - 1] = $srows.get(i).childNodes[0].childNodes[0].value;
  }

  //pivot
  //pivot index
  for (let i = 0; i < height; i++) {
  	//simplification steps
  }

  console.log(matrix);

  let $content = $('.content');
  $content.empty();

  let button = "<button class='submit' onclick='homeScreen();'>New Matrix</button>";
  $content.append(button);

}

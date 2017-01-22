function createMatrix() {

  let height = document.getElementById('matrix-create').elements[0].value;
  let width = document.getElementById('matrix-create').elements[1].value;

  if (width < 2) {
    alert('Must have at least 2 columns!');
    return;
  }

  let $matrix = $('#matrix');
  let $solution = $('#solution');
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

  let $matrixForm = $('#matrix-form');
  let submitButton = "<input class='submit' type='submit' value='Go!' type='GET'>";

  $matrixForm.append(submitButton);

}

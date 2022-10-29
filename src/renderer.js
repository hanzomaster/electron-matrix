const { ipcRenderer } = require("electron");

document.querySelector("form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");

  const values = document.querySelectorAll("input[type='text']").values();
  let matrix1 = [];
  let matrix2 = [];
  let row = [];
  for (let i = 0; i < 9; i++) {
    row.push(values.next().value.value);
    if (row.length === 3) {
      matrix1.push(row);
      row = [];
    }
  }
  for (let i = 0; i < 9; i++) {
    row.push(values.next().value.value);
    if (row.length === 3) {
      matrix2.push(row);
      row = [];
    }
  }
  const determinant1 = determinant(matrix1);
  const determinant2 = determinant(matrix2);

  const product = multiplyMatrices(matrix1, matrix2);

  const productResult = document.querySelector(".result");
  // loop through the product matrix and change the value of input fields
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      productResult.children[0].children[i].children[j].children[0].value =
        product[i][j];
    }
  }

  console.log(determinant(matrix1));
  console.log(multiplyMatrices(matrix1, matrix2));
  ipcRenderer.send("form-submitted", 1);
});

// NOTE - calculate determinant of a matrix
function determinant(m) {
  if (m.length === 0) return 0;
  if (m.length === 1) return m[0][0];
  if (m.length === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  if (m.length > 2) {
    const result = m.reduce((prev, curr, i, arr) => {
      let miniArr = arr
        .slice(0, i)
        .concat(arr.slice(i + 1))
        .map((item) => item.slice(1));
      return prev + (i % 2 === 0 ? 1 : -1) * curr[0] * determinant(miniArr);
    }, 0);
    return Math.abs(result);
  }
}

// NOTE - multiply two matrices
const multiplyMatrices = (m1, m2) => {
  if (!Array.isArray(m1) || !Array.isArray(m2) || !m1.length || !m2.length) {
    throw new Error("arguments should be in 2-dimensional array format");
  }
  let x = m1.length,
    z = m1[0].length,
    y = m2[0].length;
  if (m2.length !== z) {
    throw new Error(
      "number of columns in first matrix should be equal to number of rows in second matrix"
    );
  }
  let productRow = Array.apply(null, new Array(y)).map(
    Number.prototype.valueOf,
    0
  );
  let product = new Array(x);
  for (let p = 0; p < x; p++) {
    product[p] = productRow.slice();
  }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        product[i][j] += m1[i][k] * m2[k][j];
      }
    }
  }
  return product;
};

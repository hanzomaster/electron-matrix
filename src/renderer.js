const { ipcRenderer } = require("electron");
const math = require("mathjs");

document.querySelector("form")?.addEventListener("submit", (e) => {
  e.preventDefault();

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
  matrix1 = math.matrix(matrix1);
  matrix2 = math.matrix(matrix2);
  const determinant1 = document.querySelector("#determinant1");
  const determinant2 = document.querySelector("#determinant2");
  determinant1.style.display = "inline-block";
  determinant2.style.display = "inline-block";
  determinant1.textContent = math.abs(math.det(matrix1));
  determinant2.textContent = math.abs(math.det(matrix2));

  const product = math.multiply(matrix1, matrix2);

  const productResult = document.querySelector(".result");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      productResult.children[0].children[i].children[j].children[0].value =
        product._data[i][j];
    }
  }

  console.log(product);
  ipcRenderer.send("form-submitted", 1);
});

const inverse = (m) => {
  return math.inv(m);
};

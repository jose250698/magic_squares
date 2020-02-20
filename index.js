// Test input
// var array = [[4, 9, 2],
//              [3, 5, 7],
//              [8, 1, 5]]; 
// Correct magic square
// var array = [[4, 9, 2],
//              [3, 5, 7],
//              [8, 1, 6]]; 

// VECTOR DE ENTRADA
var user_vector = [4, 9, 2, 
                   3, 3, 7, 
                   8, 1, 7] 
var val = 15;

const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
}

function validate_rows(array) {
  for (var i = 0; i < array.length; i++) {
      var accum = 0;
      for (var j = 0; j < array.length; j++) {
          accum += array[i][j];
      }
      if (accum !== val) 
        return false; 
  }
  return true;
}

function validate_columns(array) {
  for (var i = 0; i < array.length; i++) {
      var accum = 0;
      for (var j = 0; j < array.length; j++) {
          accum += array[j][i];
      }
      if (accum !== val) 
          return false; 
  }
  return true;
}

function validate_main_diagonal(array) {
  var accum = 0;
  for (var i = 0; i < array.length; i++) {
      accum += array[i][i];
  }
  if (accum !== val)
    return false;
  return true;
}

function validate_secondary_diagonal(array) {
  var accum = 0;
  for (var i = 0; i < array.length; i++) {
    for (var j = 2; j > -1; j--) {
        if ((i + j) == array.length - 1) {
            accum += array[i][j];
        }
    }
  }
  if (accum !== val)
      return false;
  return true;
}

function validate_magic_square(array) {
    if (!validate_rows(array) || !validate_columns(array) || !validate_main_diagonal(array) || !validate_secondary_diagonal(array))
        return false;
    else
        return true;
}

function difference (user_vector, vector) {
    var sum = 0; 
    for (var i = 0; i < 9; i++) 
        sum += Math.abs(user_vector[i] - vector[i]); 
  
    return sum;
}

var permutations = permutator([1, 2, 3, 4, 5, 6, 7, 8, 9]); 
var minimal_cost = Number.MAX_SAFE_INTEGER; // variable para ir almacenando el costo mínimo

var magic_squares = [];
// Llenamos magic_squares
permutations = permutations.forEach(element => {
    var array = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++){
            array[i][j] = element[3 * i + j];
        }
    }  
    if(validate_magic_square(array)) {
        magic_squares.push(array);
    }
});

function convert_magic_squares_to_vectors (magic_squares) {
    magic_squares.forEach(element => {
        magic_vector = []
        // Convertimos cada arreglo 3x3 a un vector donde i representa cada magic square
        for (var j = 0; j < element.length; j++) {
            for (var k = 0; k < element.length; k++) {
                magic_vector.push(element[j][k]);
            }
        }
        minimal_cost = Math.min(minimal_cost, difference(user_vector, magic_vector));
    });

    return minimal_cost;
};

console.log("El costo mínimo es", convert_magic_squares_to_vectors(magic_squares));
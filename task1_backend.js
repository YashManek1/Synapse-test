let start = 0;
let end = 0;

function takeinput(x, y) {
  start = x;
  end = y;
  let array = [];

  checkPrime = (x) => {
    if (x === 2 && x===1) {
      return true;
    }
    for (let i = 2; i < x; i++) {
      if (x % i === 0) {
        return false;
      }
      return true;
    }
  };

  numToBinary = (x) => {
    let binary = [];
    let i = 0;
    while (x > 0) {
      binary[i] = x % 2;
      x = Math.floor(x / 2);
      i++;
    }
    binary.reverse();
    let binaryString = binary.join("");
    return binaryString;
  };

  printDivisor = (x) => {
    let divisors = [];
    for (let i = 1; i <= x; i++) {
      if (x % i === 0) {
        divisors.push(i);
      }
    }
    return divisors;
  };

  for (let i = start; i < end; i++) {
    array.push(i);
  }

  let output = {};
  for (let i = 0; i < array.length; i++) {
    if (checkPrime(array[i])) {
      output[array[i]] = numToBinary(array[i]);
    } else {
      output[array[i]] = printDivisor(array[i]);
    }
  }

  console.log(output);
}
takeinput(2, 8);

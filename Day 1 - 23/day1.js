const fs = require("fs");

function partOne(file) {
  const linesSplit = fs.readFileSync(file, "utf-8").trim().split("\n");

  const numbers = linesSplit.map((line) => line.replace(/\D+/g, ""));

  const conjoinedNumbers = numbers.map((number) =>
    Number(number[0] + number.slice(-1))
  );

  const fullAddition = conjoinedNumbers.reduce((a, b) => a + b, 0);
  console.log(fullAddition);
}

// partOne("./input.txt");
function partTwo(file) {
  const linesDiff = fs.readFileSync(file, "utf-8").trim().split("\n");

  const numbersArray = linesDiff
    .map((row) => {
      const numberMap = {
        twone: 21,
        nineight: 98,
        oneight: 18,
        threeight: 38,
        eightwo: 82,
        fiveight: 58,
        eightthree: 83,
        sevenine: 79,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
      };
      Object.keys(numberMap).forEach((key) => {
        if (row.includes(key)) row = row.replaceAll(key, `${numberMap[key]}`);
      });
      const lastDigitMatch = row.match(/(\d)[^\d]/);
      const converted = lastDigitMatch.input.replace(/\D+/g, "");
      return converted;
    })
    .join(",");
  // console.log(numbersArray.split(","));
  let arrayed = numbersArray.split(",");

  const conjoinedNumbers = arrayed.map((number) =>
    Number(number[0] + number.slice(-1))
  );

  fullAddition = conjoinedNumbers.reduce((a, b) => a + b, 0);
  return fullAddition;
}

// console.log(Lines);
console.log(partTwo("./input.txt"));

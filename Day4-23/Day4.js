const fs = require("fs");
function partOne(data) {
  const linesDiff = fs.readFileSync(data, "utf-8").trim().split("\r");

  // Use the reduce function to iterate over each line and accumulate the result.
  return linesDiff.reduce((total, line) => {
    // Split each line into two parts based on ": ".
    const [cardId, lineData] = line.split(": ");

    // Split the second part of the line based on "|".
    const [winningStr, picked] = lineData.split("|");

    // Extract numbers from winningStr and picked using a regular expression.
    //\d+ means match one or more digits.
    const winningNumbers = winningStr.match(/\d+/g) || [];
    const pickedNumbers = picked.match(/\d+/g) || [];

    // Use filter to count the matching numbers between winningNumbers and pickedNumbers.
    const count = winningNumbers.filter((num) =>
      pickedNumbers.includes(num)
    ).length;

    // Accumulate the result based on the count, applying a mathematical formula.
    return total + (count !== 0 ? 2 ** (count - 1) : 0);
  }, 0);
}

// Call the partOne function with the file "input.txt" and log the result to the console.
console.log(partOne("input.txt"));

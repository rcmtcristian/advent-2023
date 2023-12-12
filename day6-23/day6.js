// Sample input data
const sampleInput = `Time:      7  15   30
Distance:  9  40  200`;

// Input data
const input = `Time:        58     99     64     69
Distance:   478   2232   1019   1071`;
// Function to parse input and extract race data
const parseInput = (input) => {
  // Object to store race data
  const allRaceData = {};

  // Extract and sum the time values
  const time = input
    .split("\n")[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((item) => item.trim() !== "")
    .reduce((acc, curr) => (acc += curr));

  // Extract and sum the distance values
  const distance = input
    .split("\n")[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((item) => item.trim() !== "")
    .reduce((acc, curr) => (acc += curr));

  // Store the parsed data in the allRaceData object
  allRaceData[0] = {
    time: +time, // Convert time to a number
    recordDistance: +distance, // Convert distance to a number
  };

  // Return the object containing the parsed data
  return allRaceData;
};

// Display the result of parsing the sample input
console.log(parseInput(sampleInput));

// Function to calculate ways to beat the race record
const waysToBeatRecord = (race) => {
  // Initialize variables
  let waysToBeatRecord = 0;
  let speed = 0;
  let timeRemaining = race.time;

  // Loop to simulate button holds and calculate race distance
  for (let buttonHoldTime = 1; buttonHoldTime < race.time; buttonHoldTime++) {
    speed += 1;
    timeRemaining -= 1;
    const raceDistance = speed * timeRemaining;

    // Check if the race distance exceeds the record distance
    if (raceDistance > race.recordDistance) waysToBeatRecord += 1;
  }

  // Return the calculated ways to beat the record
  return waysToBeatRecord;
};

// Uncomment the line below to display the result of waysToBeatRecord function
// console.log(waysToBeatRecord(parseInput(sampleInput)[0]));

// Function to calculate ways to beat the boat race record for all races
const beatBoatRaceRecord = (input) => {
  // Parse the input to get all race data
  const allRaceData = parseInput(input);

  // Array to store ways to beat records for each race
  let allWaysToBeatRecords = [];

  // Loop through each race and calculate ways to beat the record
  for (let raceData in allRaceData) {
    const race = allRaceData[raceData];
    allWaysToBeatRecords.push(waysToBeatRecord(race));
  }

  // Multiply all the calculated ways to beat records to get the final result
  return allWaysToBeatRecords.reduce((acc, curr) => acc * curr);
};

// sample input
// console.log(beatBoatRaceRecord(sampleInput));

//custom input
console.log(beatBoatRaceRecord(input));

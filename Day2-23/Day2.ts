// you walk, the Elf shows you a small bag and some cubes which are either red, green, or blue. Each time you play this game, he will hide a secret number of cubes of each color in the bag, and your goal is to figure out information about the number of cubes.

// To get information, once a bag has been loaded with cubes, the Elf will reach into the bag, grab a handful of random cubes, show them to you, and then put them back in the bag. He'll do this a few times per game.

// You play several games and record the information from each game (your puzzle input). Each game is listed with its ID number (like the 11 in Game 11: ...) followed by a semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).

// For example, the record of a few games might look like this:

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

// In game 1, three sets of cubes are revealed from the bag (and then put back again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.

// The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

// In the example above, games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration. However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; similarly, game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. If you add up the IDs of the games that would have been possible, you get 8.

// Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?


const possibleGames = (allGames, target) => {
  return allGames.split('\n').reduce((acc, curr) => {
    const game = curr.split(': ');
    const gameID = +game[0].split(' ')[1];
    const draws = game[1];

    const possible = draws.split('; ').reduce((isValidGame, draw) => {
      const drawMap = {};
      draw.split(', ').forEach((cubeSet) => {
        const splitSet = cubeSet.split(' ');
        drawMap[splitSet[1]] = +splitSet[0];
      });

      for (let color in drawMap) {
        if (!target[color] || target[color] < drawMap[color]) return false;
      }

      return isValidGame;
    }, true);

    if (possible) return acc + gameID;
    else return acc;
  }, 0);
};

// Example usage:
// const allGames = "1: red 2, green 3; blue 1\n2: red 1, green 5; blue 2";
// const target = { red: 2, green: 3, blue: 1 };
// const result = possibleGames(allGames, target);
// console.log(result);

// console.log(
//   possibleGames(
//     `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
//     { red: 12, green: 13, blue: 14 }
//   )
// )
/*
PART 2:
in each game, what is the FEWEST number of cubes of each color to make each game possible?
the result should be given as the POWER: which is the number of red, green, and blue cubes multiplied together.
the final result, we want the SUM of all POWERS across all games.

find the largest number of cubes of each color among the draws in a game.
as we look at each game, init an object smallest = {red: 0, green: 0, blue: 0}
after we've mapped out each draw, compare the values to our smallest. If the value for any color is larger than the current smallest value, overwrite that smallest value.
after going through all draws, multiply all smallest values together, and add to an accumulator

*/
const totalCubePower = (allGames) => {
  return allGames.split('\n').reduce((acc, curr) => {
    const game = curr.split(': ');
    const draws = game[1];

    const fewestPossible = {
      red: 0,
      green: 0,
      blue: 0,
    };

    draws.split('; ').forEach((draw) => {
      const drawMap = {};
      draw.split(', ').forEach((cubeSet) => {
        const splitSet = cubeSet.split(' ');
        drawMap[splitSet[1]] = +splitSet[0];
      });

      for (let color in drawMap) {
        fewestPossible[color] = Math.max(fewestPossible[color], drawMap[color]);
      }
    });

    const cubePower =
      fewestPossible['red'] * fewestPossible['green'] * fewestPossible['blue'];

    return acc + cubePower;
  }, 0);
};

const solvePuzzles = (allGames, target) => {
  const part1 = possibleGames(allGames, target);
  const part2 = totalCubePower(allGames);
  return `Total possible games: ${part1}\nTotalCubePower: ${part2}`;
};




console.log(
  solvePuzzles(
    `Game 1: 14 green, 8 blue, 9 red; 5 blue, 4 green, 2 red; 4 red, 4 blue, 4 green; 1 blue, 3 green, 2 red; 10 red, 3 blue, 15 green; 2 red, 6 green, 3 blue
Game 2: 1 red, 12 green, 2 blue; 2 green, 1 blue, 1 red; 4 green, 2 blue; 10 green, 3 blue; 4 green, 2 red, 2 blue
Game 3: 16 red, 3 green; 7 green, 15 red, 3 blue; 4 green, 20 red, 1 blue; 12 red, 13 green, 1 blue; 2 green, 8 red, 1 blue; 16 red, 7 green
Game 4: 3 red, 7 blue; 4 blue, 3 green; 19 blue, 1 red, 3 green; 16 blue, 4 red, 5 green; 1 red, 19 blue, 3 green
Game 5: 7 blue, 4 red, 6 green; 2 red, 3 green, 6 blue; 11 blue, 1 red, 5 green
Game 6: 7 red, 13 blue; 2 green, 9 red, 7 blue; 7 green, 3 red, 12 blue; 11 green, 3 blue, 4 red; 12 green, 10 blue
Game 7: 2 green, 5 red; 4 green, 1 blue, 3 red; 1 blue, 1 green, 18 red; 4 green, 12 red, 1 blue
Game 8: 12 red, 9 green, 11 blue; 13 blue, 1 red, 16 green; 12 blue, 12 green; 3 green, 7 blue, 2 red
Game 9: 1 green, 9 red, 9 blue; 4 blue, 2 red; 17 red, 6 green, 3 blue; 3 green, 1 blue, 12 red
Game 10: 2 blue, 11 red, 3 green; 4 blue, 11 red, 13 green; 4 blue, 15 green, 4 red; 1 blue, 3 green, 17 red
Game 11: 9 green, 3 blue, 2 red; 11 blue, 16 green, 5 red; 7 blue, 3 red, 5 green; 7 red, 8 green, 10 blue
Game 12: 13 green, 2 red, 2 blue; 1 red, 6 green; 5 green, 3 red, 8 blue
Game 13: 2 blue, 5 green; 2 blue, 2 green; 2 blue, 2 red, 4 green
Game 14: 4 red, 2 green, 1 blue; 7 red, 1 green; 6 red, 18 green, 4 blue; 3 green, 1 blue
Game 15: 2 blue, 5 green, 12 red; 13 red, 8 green; 10 blue, 6 red, 8 green; 9 blue, 7 red; 2 green, 15 red; 9 blue, 3 green, 14 red
Game 16: 8 green, 11 blue, 14 red; 4 red, 8 green; 5 red, 4 blue, 3 green; 4 green, 13 blue, 6 red; 9 red, 8 blue, 11 green
Game 17: 8 red, 6 green; 5 blue, 7 green; 10 red, 6 blue; 9 blue, 10 green, 7 red; 1 red, 3 green, 5 blue
Game 18: 8 blue, 10 red; 6 red, 5 blue, 6 green; 16 green, 6 blue, 1 red; 16 red, 3 green, 5 blue
Game 19: 2 green, 17 blue; 2 blue, 4 green, 7 red; 6 red, 12 blue; 6 blue, 5 red, 10 green
Game 20: 4 green, 8 red, 9 blue; 6 blue, 4 green; 5 blue, 7 green, 9 red; 9 red, 9 blue, 6 green
Game 21: 1 green, 11 red, 2 blue; 6 red, 7 blue; 5 red, 1 green; 2 red, 7 blue
Game 22: 8 blue, 1 red, 4 green; 6 blue, 4 green, 14 red; 5 green, 8 red, 9 blue
Game 23: 4 blue, 12 red, 1 green; 1 green, 10 blue; 11 red, 2 blue; 1 blue, 1 green
Game 24: 5 blue, 1 green; 2 green, 2 blue, 4 red; 3 red, 5 blue
Game 25: 13 blue, 5 green, 4 red; 5 red, 17 blue; 6 blue, 8 green, 1 red; 2 blue, 1 red, 8 green; 3 red, 3 green
Game 26: 2 green, 9 red, 2 blue; 3 green, 19 red; 2 green, 16 red, 6 blue; 11 green, 4 red, 4 blue; 2 blue, 8 red, 13 green; 7 blue
Game 27: 1 red, 17 green, 1 blue; 4 red, 8 green; 1 blue, 7 green, 7 red; 18 green, 2 red
Game 28: 6 blue, 1 red; 2 blue, 1 red; 1 red, 1 green, 5 blue; 1 green; 1 green, 3 blue; 1 blue, 1 green
Game 29: 15 blue, 8 red, 1 green; 6 red, 2 green, 17 blue; 13 blue, 12 red; 12 blue, 2 green, 12 red; 5 red, 14 blue
Game 30: 4 blue, 6 green, 4 red; 3 blue, 2 green, 9 red; 5 green, 18 red; 9 blue, 16 red, 5 green
Game 31: 6 blue, 7 green, 4 red; 8 green, 6 blue, 10 red; 6 red, 2 green, 2 blue; 2 green, 4 blue, 6 red; 2 red, 7 green; 7 red, 13 green, 2 blue
Game 32: 5 blue; 2 green, 8 blue; 1 red, 6 blue, 2 green; 2 green, 11 blue
Game 33: 1 red, 7 green, 17 blue; 1 red, 14 blue, 2 green; 13 blue
Game 34: 12 red, 1 green, 1 blue; 11 red, 1 blue, 1 green; 16 red, 3 green; 9 red, 1 blue; 15 red, 2 blue; 1 green, 4 blue, 8 red
Game 35: 6 blue, 13 red, 1 green; 8 red, 9 blue, 6 green; 12 red, 8 green
Game 36: 5 blue, 3 red; 2 green, 3 red; 9 green, 6 red, 1 blue; 3 blue, 4 red, 9 green
Game 37: 14 blue, 3 red; 2 green, 2 red, 8 blue; 11 blue, 5 red
Game 38: 3 red, 18 green, 2 blue; 5 green, 5 red; 1 red, 12 green, 6 blue; 3 red, 5 blue, 1 green; 4 blue, 6 red, 17 green; 17 green, 6 blue, 3 red
Game 39: 5 green, 13 blue, 1 red; 6 green, 1 red, 12 blue; 1 red, 2 green, 11 blue; 1 red, 2 green, 12 blue
Game 40: 15 red; 14 red, 2 green, 4 blue; 13 red, 5 blue; 5 blue, 1 green, 18 red
Game 41: 2 red, 15 green; 11 red, 6 green, 17 blue; 10 green, 15 red, 9 blue; 8 red, 4 blue; 1 green, 13 blue, 13 red
Game 42: 3 green, 3 blue, 1 red; 2 red, 8 blue, 1 green; 7 blue, 2 red, 1 green
Game 43: 8 green, 10 red, 4 blue; 3 red, 11 green, 10 blue; 4 red, 5 blue, 2 green; 9 green, 10 red, 4 blue
Game 44: 3 green, 4 blue, 4 red; 10 red, 5 green, 4 blue; 1 green, 16 red; 2 blue, 15 red, 6 green; 13 red, 2 blue, 4 green
Game 45: 5 blue, 3 red; 1 red, 3 blue, 17 green; 2 red, 3 blue
Game 46: 9 blue, 10 green, 5 red; 1 red, 5 blue, 1 green; 6 blue, 8 green, 9 red; 2 red, 4 blue, 11 green
Game 47: 3 green, 7 red, 7 blue; 12 red, 1 blue; 6 blue, 4 green, 6 red; 6 red, 5 blue, 1 green
Game 48: 5 green, 1 blue; 2 green, 8 red, 4 blue; 16 red, 12 blue, 8 green
Game 49: 19 green, 4 blue, 9 red; 3 green, 1 blue, 8 red; 7 red, 1 blue, 14 green; 2 blue, 7 green, 2 red
Game 50: 6 blue, 11 red; 1 green, 8 blue, 11 red; 5 blue, 1 green; 4 blue, 12 red, 1 green; 1 green, 6 red, 8 blue; 7 blue, 5 red
Game 51: 5 red, 7 green; 8 green; 4 blue, 7 green, 2 red
Game 52: 3 blue, 12 red, 1 green; 13 red, 1 blue; 7 blue, 8 red; 7 blue, 9 red; 4 red, 5 green
Game 53: 2 blue; 1 green, 4 red, 12 blue; 1 green, 7 blue, 4 red; 8 blue, 1 green, 4 red
Game 54: 2 blue, 7 green; 1 red, 1 green, 2 blue; 5 red, 5 blue, 7 green; 5 red, 5 blue, 6 green; 7 green; 7 green, 2 blue, 5 red
Game 55: 2 green, 20 blue, 3 red; 2 red, 1 green, 1 blue; 2 green, 14 blue, 2 red; 2 red, 11 blue; 8 green, 4 blue, 2 red
Game 56: 5 red, 1 green, 10 blue; 2 red, 1 blue; 1 blue, 2 red; 1 green, 8 blue
Game 57: 1 green, 4 red, 5 blue; 20 blue, 4 red, 2 green; 17 blue, 1 green; 1 green, 10 blue, 1 red; 3 red, 17 blue
Game 58: 15 green, 2 blue; 15 green, 4 blue, 2 red; 14 blue, 5 red, 15 green; 15 green
Game 59: 1 blue; 5 green, 8 red, 1 blue; 15 red, 2 blue, 1 green
Game 60: 3 green, 4 blue, 16 red; 6 blue, 10 green, 10 red; 2 blue, 13 red, 8 green
Game 61: 2 green, 2 blue, 3 red; 7 blue, 15 red, 9 green; 5 green, 1 blue, 8 red; 4 blue, 6 green, 18 red
Game 62: 5 red, 7 blue, 13 green; 7 green, 6 blue, 8 red; 6 blue, 8 red, 12 green; 2 blue, 6 red; 5 red, 4 blue, 5 green
Game 63: 3 red; 5 blue, 2 red; 10 red, 1 green, 4 blue; 5 blue, 4 red, 3 green
Game 64: 7 blue, 3 green; 5 red, 6 green, 14 blue; 1 green, 12 blue, 9 red; 1 blue, 8 red, 12 green
Game 65: 12 red, 12 blue; 5 green, 12 blue, 11 red; 6 green, 3 red, 14 blue; 11 green, 4 red, 1 blue; 11 red, 3 green, 2 blue; 13 blue, 9 red, 5 green
Game 66: 1 red, 1 green; 3 blue, 6 red, 3 green; 6 blue, 1 green, 4 red; 8 green, 1 red
Game 67: 2 green, 8 blue; 5 red, 7 blue, 4 green; 8 red, 5 green, 5 blue; 2 red, 1 blue
Game 68: 3 green, 14 blue, 3 red; 16 blue, 7 green, 4 red; 10 blue, 6 red; 4 green, 3 blue, 5 red; 2 red, 14 blue, 8 green
Game 69: 11 red, 1 green; 1 green, 4 blue, 13 red; 18 red, 3 blue; 7 red, 1 green, 9 blue; 5 blue, 1 red, 1 green; 3 red, 4 blue
Game 70: 10 blue, 2 green, 4 red; 4 green, 4 red, 2 blue; 7 green, 5 red, 1 blue; 7 green, 3 red, 10 blue; 7 green, 2 blue, 5 red; 1 blue, 9 red, 2 green
Game 71: 1 green, 6 blue; 10 blue, 2 red, 1 green; 8 blue, 1 red; 11 blue, 2 green, 3 red; 1 green, 10 blue
Game 72: 10 blue, 3 red, 2 green; 11 red, 4 green, 3 blue; 1 blue, 4 red, 3 green
Game 73: 8 red, 17 green, 3 blue; 5 blue, 10 red, 8 green; 9 green, 12 red, 3 blue
Game 74: 5 green, 4 blue, 1 red; 4 red, 6 blue; 2 red; 2 blue, 1 red; 3 blue, 1 green, 3 red
Game 75: 4 blue; 3 red, 10 blue, 14 green; 8 blue, 3 red, 11 green
Game 76: 10 blue, 15 green, 5 red; 14 green; 6 blue, 10 red, 13 green; 2 green, 10 red, 6 blue; 1 red, 6 blue
Game 77: 3 green, 5 red, 8 blue; 14 red, 15 green; 14 green, 1 blue, 2 red
Game 78: 5 blue, 5 green; 9 blue, 2 green, 5 red; 4 red, 4 blue, 1 green; 3 red, 10 green, 2 blue; 4 red, 12 blue, 3 green; 4 green, 5 red, 13 blue
Game 79: 6 red, 1 green, 18 blue; 5 red, 11 blue, 2 green; 2 green, 4 red, 4 blue; 7 red, 17 blue; 9 red, 1 green, 3 blue
Game 80: 5 blue, 6 green, 6 red; 2 blue, 8 green, 8 red; 5 green, 16 blue, 3 red; 2 green, 3 red, 1 blue
Game 81: 11 green, 5 blue; 1 blue, 10 green, 1 red; 3 red, 3 blue, 15 green
Game 82: 14 red, 11 green; 2 green, 11 blue; 9 blue, 7 green, 7 red; 13 blue, 17 red, 3 green; 12 green, 15 blue, 8 red
Game 83: 2 green, 9 red, 4 blue; 3 green, 4 blue, 5 red; 2 green, 9 red, 7 blue; 4 blue, 3 green
Game 84: 4 red, 3 green, 6 blue; 2 blue, 5 red, 2 green; 6 blue, 1 red, 10 green; 1 green, 1 blue, 3 red; 16 blue, 6 red, 2 green
Game 85: 14 red, 4 green, 6 blue; 11 red, 2 green, 6 blue; 9 red; 3 blue, 13 red, 8 green; 3 green, 2 blue, 8 red
Game 86: 4 red, 1 green; 14 blue, 3 red, 2 green; 5 red, 3 green, 5 blue; 13 blue, 11 green, 1 red; 1 green, 14 blue, 3 red
Game 87: 1 blue, 2 green, 4 red; 11 blue, 3 green, 4 red; 11 blue; 4 green, 11 blue, 3 red; 4 blue, 5 green, 2 red
Game 88: 1 red, 1 blue, 1 green; 3 green, 1 blue, 1 red; 9 blue, 5 red, 5 green; 3 blue, 5 red, 8 green; 2 blue, 3 red, 13 green; 8 blue, 3 red, 9 green
Game 89: 3 green, 12 red, 11 blue; 10 red, 7 green, 14 blue; 17 green, 9 blue; 15 green, 1 red, 3 blue
Game 90: 12 green, 7 red, 5 blue; 12 green, 1 blue, 6 red; 6 red, 3 green
Game 91: 11 red, 10 green, 15 blue; 5 red, 6 green, 2 blue; 3 blue, 9 red, 7 green; 11 red, 1 green, 15 blue; 10 blue, 4 green; 9 red, 7 green, 14 blue
Game 92: 1 green, 6 red, 4 blue; 5 blue, 1 green; 6 red, 6 blue
Game 93: 19 red, 8 green, 9 blue; 7 blue, 1 red, 9 green; 2 red, 9 blue, 11 green; 1 blue, 4 green, 10 red; 10 blue, 11 red; 4 green, 8 blue, 16 red
Game 94: 11 red, 1 green, 1 blue; 4 green, 8 red; 2 red, 1 green; 4 green, 5 red; 5 red, 1 blue; 1 blue, 2 green, 9 red
Game 95: 6 green, 7 blue, 8 red; 1 red, 7 green; 16 green, 2 blue, 3 red; 5 green, 10 blue, 8 red; 5 red, 16 green, 3 blue; 4 red, 10 blue, 12 green
Game 96: 6 blue, 5 green, 6 red; 3 red, 5 blue, 4 green; 2 blue, 2 red, 3 green
Game 97: 3 red, 8 green; 2 blue, 3 green; 13 red, 10 green, 3 blue
Game 98: 4 green, 9 red, 2 blue; 1 blue, 5 green, 18 red; 3 green, 16 red; 15 red, 1 green, 2 blue
Game 99: 7 green, 2 red, 5 blue; 9 red, 17 green, 19 blue; 8 red, 12 blue, 1 green; 11 red, 11 green, 10 blue; 19 green, 4 blue, 2 red
Game 100: 4 blue, 3 green; 5 blue, 12 green; 16 green, 1 red, 1 blue; 2 blue, 1 green; 1 red, 3 blue, 18 green; 3 green, 1 red, 3 blue`,
    { red: 12, green: 13, blue: 14 }
  )
)
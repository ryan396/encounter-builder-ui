import ChallengeRating from "../types/ChallengeRating";
import Monster from "../types/Monster";

const challengeRatingTable: ChallengeRating[] = [
  {
    levelHigher: -2,
    normal: 0.5,
    mook: 0.1,
    large: 1,
    huge: 1.5,
  },
  {
    levelHigher: -1,
    normal: 0.7,
    mook: 0.15,
    large: 1.5,
    huge: 2,
  },
  {
    levelHigher: 0,
    normal: 1,
    mook: 0.2,
    large: 2,
    huge: 3,
  },
  {
    levelHigher: 1,
    normal: 1.5,
    mook: 0.3,
    large: 3,
    huge: 4,
  },
  {
    levelHigher: 2,
    normal: 2,
    mook: 0.4,
    large: 4,
    huge: 6,
  },
  {
    levelHigher: 3,
    normal: 3,
    mook: 0.6,
    large: 6,
    huge: 8,
  },
  {
    levelHigher: 4,
    normal: 4,
    mook: 0.8,
    large: 8,
    huge: 10,
  },
];
const monsters = [
  {
    name: "Goblin Curse Victim",
    size: "Normal",
    level: 1,
    role: "Mook",
    type: "Humanoid",
    source: "Strangle",
    page: 22,
    notes: "",
    quantity: 0,
  },
  {
    name: "Kobold Grand-Wizard",
    size: "Normal",
    level: 1,
    role: "Mook",
    type: "Humanoid",
    source: "B 1",
    page: 123,
    notes: "",
    quantity: 0,
  },
];

const calculateChallengeRating = (encounter: Monster[], grouplevel: number) => {
  let challengeRating = 0;
  encounter.map((monster) => {
    const levelDifference = monster.level - grouplevel;
    const index = challengeRatingTable.findIndex((row) => {
      return row.levelHigher === levelDifference;
    });
    if (index > -1) {
      const challengeRatingRow = challengeRatingTable[index];
      const matchingSize = challengeRatingRow[monster.size.toLowerCase()];
      if (matchingSize && typeof matchingSize === "number") {
        challengeRating += matchingSize;
      }
    } else {
      console.log("not found");
    }
  });
  return challengeRating;
};

console.log(calculateChallengeRating(monsters, 1));

export { calculateChallengeRating };

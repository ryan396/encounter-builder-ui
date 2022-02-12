export default interface ChallengeRating {
  [key: string]: number | string;
  levelHigher: number;
  normal: number;
  mook: number;
  large: number;
  huge: number;
}

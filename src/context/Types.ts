export type Monster = {
  name: string;
  size: string;
  level: number;
  role: string;
  source: string;
  page: number;
  notes: string;
  type: string;
  quantity: number;
};

export type Encounter = {
  partyLevel: number;
  partySize: number;
  monsters: Monster[];
};

export type State = {
  encounter: Encounter;
  myEncounterList: Encounter[];
};

export type ContextValues = {
  state: State;
  dispatch: React.Dispatch<any>;
};

export const initialEncounter: State = {
  encounter: { partyLevel: 1, partySize: 1, monsters: [] },
  myEncounterList: [],
};

export type ChallengeRating = {
  [key: string]: number | string;
  levelHigher: number;
  normal: number;
  mook: number;
  large: number;
  huge: number;
};

import { createContext, useReducer } from "react";
import Monster from "../types/Monster";

type encounter = Monster[];

type State = {
  encounter: encounter;
  myEncounterList: encounter[];
};

type ContextValues = {
  state: State;
  dispatch: React.Dispatch<any>;
};

const initialEncounter: State = {
  encounter: [],
  myEncounterList: [],
};

const addMonster = (monster: Monster, state: State) => {
  const selectedMonster = state.encounter.find(
    (item: Monster) => item.name === monster.name
  );
  let newState = state.encounter;
  if (!selectedMonster) {
    monster.quantity = 1;
    newState = state.encounter.concat(monster);
  } else {
    selectedMonster.quantity++;
  }
  return { encounter: newState, myEncounterList: state.myEncounterList };
};

const removeMonster = (monster: Monster, state: State) => {
  let index = state.encounter.findIndex((item) => item.name == monster.name);
  state.encounter.splice(index, 1);
  return { encounter: state.encounter, myEncounterList: state.myEncounterList };
};

const increment = (monster: Monster, state: State) => {
  const selectedMonster = state.encounter.find(
    (item) => item.name === monster.name
  );
  selectedMonster && selectedMonster.quantity++;
  return { encounter: state.encounter, myEncounterList: state.myEncounterList };
};

const decrement = (monster: Monster, state: State) => {
  const selectedMonster = state.encounter.find(
    (item) => item.name === monster.name
  );
  if (selectedMonster) {
    if (selectedMonster.quantity > 1) {
      selectedMonster.quantity--;
    } else {
      let index = state.encounter.findIndex(
        (item) => item.name == monster.name
      );
      state.encounter.splice(index, 1);
    }
  }
  return { encounter: state.encounter, myEncounterList: state.myEncounterList };
};

const saveEncounter = (encounter: Monster[], state: State) => {
  return {
    encounter: state.encounter,
    myEncounterList: state.myEncounterList.concat(encounter),
  };
};

const reset = () => {
  return initialEncounter;
};

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case "addMonster":
      return addMonster(action.payload, state);
    case "removeMonster":
      return removeMonster(action.payload, state);
    case "increment":
      return increment(action.payload, state);
    case "decrement":
      return decrement(action.payload, state);
    case "saveEncounter":
      return saveEncounter(action.payload, state);
    case "reset":
      return reset();
    default:
      throw new Error();
  }
};

const EncounterCreationContext = createContext<ContextValues>({
  state: initialEncounter,
  dispatch: () => null,
});

const EncounterCreationProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialEncounter);
  return (
    <EncounterCreationContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </EncounterCreationContext.Provider>
  );
};

export { EncounterCreationContext, EncounterCreationProvider };

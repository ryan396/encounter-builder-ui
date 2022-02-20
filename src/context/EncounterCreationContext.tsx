import { createContext, useReducer } from "react";
import { Monster, ContextValues, initialEncounter, State } from "./Types";

const addMonster = (monster: Monster, state: State) => {
  const selectedMonster = state.encounter.monsters.find(
    (item: Monster) => item.name === monster.name
  );
  let newState = state.encounter;
  if (!selectedMonster) {
    monster.quantity = 1;
    newState.monsters = state.encounter.monsters.concat(monster);
  } else {
    selectedMonster.quantity++;
  }
  return { encounter: newState, myEncounterList: state.myEncounterList };
};

const removeMonster = (monster: Monster, state: State) => {
  let index = state.encounter.monsters.findIndex(
    (item) => item.name == monster.name
  );
  state.encounter.monsters.splice(index, 1);
  return { encounter: state.encounter, myEncounterList: state.myEncounterList };
};

const increment = (monster: Monster, state: State) => {
  const selectedMonster = state.encounter.monsters.find(
    (item) => item.name === monster.name
  );
  selectedMonster && selectedMonster.quantity++;
  return { encounter: state.encounter, myEncounterList: state.myEncounterList };
};

const decrement = (monster: Monster, state: State) => {
  const selectedMonster = state.encounter.monsters.find(
    (item) => item.name === monster.name
  );
  if (selectedMonster) {
    if (selectedMonster.quantity > 1) {
      selectedMonster.quantity--;
    } else {
      let index = state.encounter.monsters.findIndex(
        (item) => item.name == monster.name
      );
      state.encounter.monsters.splice(index, 1);
    }
  }
  return { encounter: state.encounter, myEncounterList: state.myEncounterList };
};

const saveEncounter = (
  partyInfo: { partyLevel: number; partySize: number },
  state: State
) => {
  state.encounter.partyLevel = partyInfo.partyLevel;
  state.encounter.partySize = partyInfo.partySize;
  let newEncounterList = [...state.myEncounterList];
  newEncounterList.push(state.encounter);
  return {
    encounter: { ...initialEncounter.encounter },
    myEncounterList: newEncounterList,
  };
};

const reset = (state: State) => {
  return {
    encounter: { ...initialEncounter.encounter },
    myEncounterList: state.myEncounterList,
  };
};

// to do: build reducer for adjusting partylevel and size
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
      return reset(state);
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

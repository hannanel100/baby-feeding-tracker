import { useReducer } from "react";

type Baby = {
  id: number;
  name: string;
};

type Action =
  | { type: "ADD_BABY"; payload: Baby }
  | { type: "UPDATE_BABY"; payload: Baby }
  | { type: "GET_CURRENT_BABY"; payload: number };

function babyReducer(state: Baby[], action: Action): Baby[] {
  switch (action.type) {
    case "ADD_BABY":
      return [...state, action.payload];
    case "UPDATE_BABY":
      return state.map((baby) =>
        baby.id === action.payload.id ? action.payload : baby
      );
    case "GET_CURRENT_BABY":
      return state.filter((baby) => baby.id === action.payload);
    default:
      return state;
  }
}

export function useBabyData() {
  const [babies, dispatch] = useReducer(babyReducer, []);

  const addBaby = (baby: Baby) => {
    dispatch({ type: "ADD_BABY", payload: baby });
  };

  const updateBaby = (baby: Baby) => {
    dispatch({ type: "UPDATE_BABY", payload: baby });
  };
  const getCurrentBaby = (babyId: number) => {
    dispatch({ type: "GET_CURRENT_BABY", payload: babyId });
  };

  return { babies, addBaby, updateBaby, getCurrentBaby };
}

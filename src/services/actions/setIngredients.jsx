import { SET_INGREDIENTS } from "./constants";

export function setNewIngrs(sortedIngrs) {
  return {
    type: SET_INGREDIENTS,
    payload: { sortedIngrs },
  };
}

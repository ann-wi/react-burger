import { SET_INGREDIENTS } from "../../utils/constants";

export function setNewIngrs(sortedIngrs) {
  return {
    type: SET_INGREDIENTS,
    payload: { sortedIngrs },
  };
}

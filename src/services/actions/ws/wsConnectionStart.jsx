import { WS_CONNECTION_START } from "../../../utils/constants";

export function startConnection(url) {
  return {
    type: WS_CONNECTION_START,
    payload: { url },
  };
}

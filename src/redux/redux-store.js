import { createStore } from "redux";
import gameReducer from "./game-reducer";

let store = createStore(gameReducer);

export default store;
// src/store.js
import { createStore } from "redux";

const initialState = {
  displayedStories: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DISPLAYED_STORIES":
      return { ...state, displayedStories: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

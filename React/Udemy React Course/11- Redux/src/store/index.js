import { createStore } from "redux";

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
    };
  }

  if (action.type === "decrease") {
    return {
      counter: state.counter - action.amount,
    };
  }

  if (action.type === "reset") {
    return {
      counter: 0,
    };
  }

  return state;
};

// Redux store
const store = createStore(counterReducer);

export default store;

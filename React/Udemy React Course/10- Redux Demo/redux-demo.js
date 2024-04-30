const redux = require("redux");

// Reducer function receive current state (state) and action. Returning new state.
// Default State { counter: 0 }
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  } else if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

// Initializing store
const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

// An action is dispatched using the store.dispatch() method. However, the type of the dispatched action ('increment') is not handled in the counterReducer function.
// Therefore, the reducer function doesn't make any changes, and it simply increments the current state by 1
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
